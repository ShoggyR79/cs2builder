import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './item';
import ToggleButton from './togglebutton'; // Assuming you have a ToggleButton component
import Knife from './knife';
import PickerModal from './pickerModal';



const InventoryGrid = styled.div.attrs(() => ({
  className: "w-full grid grid-cols-4 gap-4 p-2 grid-rows-1",
}))`
  // Add custom styles if needed
`;

const InventoryColumn = styled.div.attrs(() => ({
  className: "col-span-1 rounded-lg shadow-lg",
}))`
  // Add custom styles if needed
`;

const InventoryScreen = ({setLoading}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [tside, setTside] = useState(false);
  const [state, setState] = useState(null);
  const [curLoadout, setCurLoadout] = useState(null);

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

  const openModal = (content) => {
    setLoading(true);
    setModalContent(content);
    setIsModalOpen(true);
    setLoading(false);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const saveModal = (tier, index, newItem) => {
    console.log(tier, index, newItem)
    // first get weapon type of newItem.
    // if it is different from the current weapon, then
    // 1) check if the current weapon is in another slot of the tier
    // 2) if it is, then swap the current weapon index to the existing weapon index 
    //    then swap the newItem to the current weapon index
    // 3) if it is not, then swap the current weapon index to the newItem index
    // otherwise, just swap the weapon at the index to the newItem
    closeModal()
  }

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/v1/loadout/default")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setState(result)
          if (tside) {
            setCurLoadout(result.tSide)
          } else {
            setCurLoadout(result.ctSide)
          }
          setLoading(false);
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])
  return (
    state && curLoadout &&
    <InventoryGrid>
      <InventoryColumn>
        <div className="text-white text-xl font-bold p-2">Pistols</div>
        <Item item={curLoadout.startingPistol} onClick={() => openModal(curLoadout.startingPistol)} />
        {curLoadout.pistols.map((item) => {
          return <Item key={item.classid} item={item} onClick={() => openModal(item)} />
        })}
      </InventoryColumn>
      <InventoryColumn>
        <div className="text-white text-xl font-bold p-2">Mid Tier</div>
        {curLoadout.midTier.map((item) => {
          return <Item key={item.classid} item={item} onClick={() => openModal(item)} />
        })}
      </InventoryColumn>
      <InventoryColumn>
        <div className="text-white text-xl font-bold p-2">High Tier</div>
        {curLoadout.highTier.map((item) => {
          return <Item key={item.classid} item={item} onClick={() => openModal(item)} />
        })}
      </InventoryColumn>
      <InventoryColumn>
        <div className="text-white text-xl font-bold p-2">Knife</div>

        <Knife item={curLoadout.knife} onClick={() => openModal(curLoadout.knife)} />
        <div className="p-2 text-white text-xl font-bold p-2">Gloves</div>

        <Knife item={curLoadout.gloves} onClick={() => openModal(curLoadout.gloves)} />
        <div className="p-2 text-white text-xl font-bold p-2">Agent</div>
        <Item item={curLoadout.agent} onClick={() => openModal(curLoadout.agent)} />

        <ToggleButton side={tside} onToggle={() => changeSide()} />
        <div className="mt-2 text-white underline text-xl font-bold">Buy us a coffee & feedback</div>
      </InventoryColumn>
      <PickerModal item={modalContent} showModal={isModalOpen} onModalClose={closeModal} setLoading={setLoading} />
    </InventoryGrid>
  );
};

export default InventoryScreen;
