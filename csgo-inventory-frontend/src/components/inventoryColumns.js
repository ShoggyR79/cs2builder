import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './item';
import ToggleButton from './togglebutton'; // Assuming you have a ToggleButton component
import Knife from './knife';
import PickerModal from './pickerModal';
import config from "../config/config.js";
import { OptionsModal } from './optionModal.js';
import { LinkModal } from './linkModal.js';
import { useNavigate } from "react-router-dom";
import { ErrorModal } from './loadoutErrorModal.js';
import { FeedbackModal } from './feedbackModal.js';



const InventoryGrid = styled.div.attrs(() => ({
  className: "w-full grid gap-1 sm:gap-4 p-2 grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-1",
}))`
  // Add custom styles if needed
`;

const InventoryColumn = styled.div.attrs(() => ({
  className: "col-span-1 rounded-lg",
}))`
  // Add custom styles if needed
`;


const InventoryScreen = ({ setLoading, id }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [tside, setTside] = useState(false);
  const [state, setState] = useState(null);
  const [curLoadout, setCurLoadout] = useState(null);
  const [info, setInfo] = useState(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [link, setLink] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [toggleReset, setToggleReset] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Cannot find loadout with the given ID, redirecting to default loadout.');
  const [totalCost, setTotalCost] = useState(0);

  const handleSaveAndShare = () => {
    const api_link = '/v1/loadout/save';
    fetch(api_link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
      .then(res => res.json())
      .then(
        (result) => {
          const generatedLink = `http://cs2builder.com?id=${result.loadout_id}`;
          setLink(generatedLink);
          setIsOptionsModalOpen(false);
          setIsLinkModalOpen(true);
        }
      );
  };

  const redirectToDefaultLoadout = () => {
    setIsErrorModalOpen(false);
    setToggleReset(!toggleReset);
    navigate('/');
  };

  const changeSide = () => {
    setLoading(true);
    setCurLoadout(null)
    if (tside) {
      setCurLoadout(state.ctSide)
    } else {
      setCurLoadout(state.tSide)
    }
    setTside(!tside);
    setLoading(false);
  }

  const openModal = (content, info) => {
    setLoading(true);
    setModalContent(content);
    setIsModalOpen(true);
    setLoading(false);
    setInfo(info);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const calculateCost = () => {
    // TODO: calculate cost of both sides
    // make sure to avoid double counting items that are the same on both side (use map/set?)
    setLoading(true);
    setTimeout(() => {
      setTotalCost(800);
      setLoading(false);
    }, 200);
  }

  const saveModal = (newItem) => {
    let tier = info.tier;
    let index = info.index;
    let side = tside ? 'tSide' : 'ctSide';
    // first get weapon type of newItem.
    // if it is different from the current weapon, then
    // 1) check if the current weapon is in another slot of the tier
    // 2) if it is, then swap the current weapon index to the existing weapon index 
    //    then swap the newItem to the current weapon index
    // 3) if it is not, then swap the current weapon index to the newItem index
    // otherwise, just swap the weapon at the index to the newItem
    let isSwapped = false;
    if (tier === 'pistols' || tier === 'midTier' || tier === 'highTier') {
      // console.log("iter", state[side][tier]);
      for (let i = 0; i < state[side][tier].length; ++i) {
        if (state[side][tier][i]['specific_type'] === newItem['specific_type']) {
          state[side][tier][i] = state[side][tier][index];
          state[side][tier][index] = newItem;
          isSwapped = true;
          break;
        }
      }
      if (!isSwapped) {
        state[side][tier][index] = newItem;
      }
    } else {
      state[side][tier] = newItem;
    }
    closeModal();
  }

  useEffect(() => {
    const fetchLoadout = async () => {
      let api_link = `/v1/loadout/default`;
      if (id) {
        api_link = `/v1/loadout/save/${id}`;
      }
      const response = await fetch(api_link);
      if (response.ok) {
        const data = await response.json();
        setState(data);
        if (tside) {
          setCurLoadout(data.tSide)
        } else {
          setCurLoadout(data.ctSide)
        }
      } else {
        setIsErrorModalOpen(true);
      }
    }

    setLoading(true);
    fetchLoadout();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, toggleReset])


  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        content={errorMsg}
        onClose={redirectToDefaultLoadout}
        onConfirm={redirectToDefaultLoadout}
      />
      {state && curLoadout &&
        <div className={"w-11/12 sm:w-3/4 p-4 my-4 sm:my-10 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-green-100 scrollbar-track-gray-600 " + (tside ? ' bg-[#554b2b]' : ' bg-[#304359]')}>

          <InventoryGrid>
            <InventoryColumn>
              <div className="text-white text-xl font-bold p-2">Pistols</div>
              <Item tside={tside} item={curLoadout.startingPistol} onClick={() => openModal(curLoadout.startingPistol, { tier: 'startingPistol', index: -1 })} />
              {curLoadout.pistols.map((item, index) => {
                return <Item tside={tside} key={item.classid} item={item} onClick={() => openModal(item, { tier: 'pistols', index: index })} />
              })}
            </InventoryColumn>
            <InventoryColumn>
              <div className="text-white text-xl font-bold p-2">Mid Tier</div>
              {curLoadout.midTier.map((item, index) => {
                return <Item tside={tside} key={item.classid} item={item} onClick={() => openModal(item, { tier: 'midTier', index: index })} />
              })}
            </InventoryColumn>
            <InventoryColumn>
              <div className="text-white text-xl font-bold p-2">High Tier</div>
              {curLoadout.highTier.map((item, index) => {
                return <Item tside={tside} key={item.classid} item={item} onClick={() => openModal(item, { tier: 'highTier', index: index })} />
              })}
            </InventoryColumn>
            <InventoryColumn>
              <div className="text-white text-xl font-bold p-2">Knife</div>

              <Knife tside={tside} item={curLoadout.knife} onClick={() => openModal(curLoadout.knife, { tier: 'knife', index: -1 })} />
              <div className="p-2 text-white text-xl font-bold px-2 py-1">Gloves</div>

              <Knife tside={tside} item={curLoadout.gloves} onClick={() => openModal(curLoadout.gloves, { tier: 'gloves', index: -1 })} />
              <div className="p-2 text-white text-xl font-bold px-2 py-1">Agent</div>
              <Item tside={tside} item={curLoadout.agent} onClick={() => openModal(curLoadout.agent, { tier: 'agent', index: -1 })} />

              <div className="flex flex-col items-center justify-center xl:flex-row xl:justify-between mt-4 ml-2 sm:ml-0">
                <div className='flex justify-center w-full'>
                  <ToggleButton side={tside} onToggle={() => changeSide()} />
                </div>
                <div className='w-full flex flex-col items-center space-y-3 mt-2 xl:mt-0 xl:justify-end'>
                  <button onClick={() => { handleSaveAndShare() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-full">
                    Save and Share
                  </button>
                  <div className='flex flex-col xl:flex-row xl:items-center space-y-2 xl:space-x-4'>
                    <p className='text-lg text-white text-center xl:text-end font-semibold'>Total: <span className='font-bold'>${totalCost}</span></p>
                    <button onClick={() => { calculateCost() }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out">
                      Calculate
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-col items-center sm:flex-row justify-center text-white underline text-xl font-bold cursor-pointer ml-2 sm:ml-0">
                <p className="p-2 hover:text-green-300 text-center" onClick={() => setIsFeedbackModalOpen(true)}>Contact us</p>
                <p className="p-2 hover:text-amber-800 text-center text-sm md:text-xl" onClick={() => redirectToDefaultLoadout()}>Reset Loadout</p>
              </div>
              <div className="text-left text-gray-300 mt-4 hidden sm:block">
                <p className='text-center'>Please adjust browser zoom to fit items</p>
              </div>
            </InventoryColumn>
            <PickerModal tside={tside} item={modalContent} showModal={isModalOpen} onModalClose={closeModal} setLoading={setLoading} saveModal={saveModal} side={tside} />
            <OptionsModal
              isOpen={isOptionsModalOpen}
              onClose={() => setIsOptionsModalOpen(false)}
              onSaveAndShare={handleSaveAndShare}
            />

            <LinkModal
              isOpen={isLinkModalOpen}
              link={link}
              onClose={() => setIsLinkModalOpen(false)}
            />
            <FeedbackModal
              isOpen={isFeedbackModalOpen}
              onClose={() => { setIsFeedbackModalOpen(false) }}
            />
          </InventoryGrid>
        </div>}
    </>
  );
};

export default InventoryScreen;
