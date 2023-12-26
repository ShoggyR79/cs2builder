import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './item';
import ToggleButton from './togglebutton'; // Assuming you have a ToggleButton component
import Knife from './knife';
import PickerModal from './pickerModal';



const InventoryGrid = styled.div.attrs(() => ({
  className: "w-full grid grid-cols-4 gap-4 p-2 grid-rows-5",
}))`
  // Add custom styles if needed
`;

const InventoryColumn = styled.div.attrs(() => ({
  className: "col-span-1 rounded-lg shadow-lg",
}))`
  // Add custom styles if needed
`;

const InventoryScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [tside, setTside] = useState(false);
  const [state, setState] = useState(null);
  const [curLoadout, setCurLoadout] = useState(null);

  const changeSide = () => {
    setCurLoadout(null)
    if (tside) {
      setCurLoadout(state.ctSide)
    } else {
      setCurLoadout(state.tSide)
    }
    setTside(!tside);

  }

  const openModal = (content) => {
    console.log("in")
    setModalContent("content");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
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
        <div className="p-2 text-white text-xl font-bold">Pistols</div>
        <Item item={curLoadout.startingPistol} onClick={() => openModal(curLoadout.startingPistol)} />
        {curLoadout.pistols.map((item) => {
          return <Item key={item.classid} item={item} onClick={() => openModal(item)} />
        })}
      </InventoryColumn>
      <InventoryColumn>
        <div className="p-2 text-white text-xl font-bold">Mid Tier</div>
        {curLoadout.midTier.map((item) => {
          return <Item key={item.classid} item={item} onClick={() => openModal(item)} />
        })}
      </InventoryColumn>
      <InventoryColumn>
        <div className="p-2 text-white text-xl font-bold">High Tier</div>
        {curLoadout.highTier.map((item) => {
          return <Item key={item.classid} item={item} onClick={() => openModal(item)} />
        })}
      </InventoryColumn>
      <InventoryColumn>
        <div className="p-2 text-white text-xl font-bold">Knife</div>

        <Knife item={curLoadout.knife} onClick={() => openModal(curLoadout.knife)} />
        <div className="p-2 text-white text-xl font-bold">Gloves</div>

        <Knife item={curLoadout.gloves} onClick={() => openModal(curLoadout.gloves)} />
        <div className="p-2 text-white text-xl font-bold">Agent</div>
        <Item item={curLoadout.agent} onClick={() => openModal(curLoadout.agent)} />

        <ToggleButton side={tside} onToggle={() => changeSide()} />
        <div className="mt-2 text-white underline text-xl font-bold">Buy us a coffee & feedback</div>
      </InventoryColumn>
      <PickerModal showModal={isModalOpen} onModalClose={closeModal} />
    </InventoryGrid>
  );
};

export default InventoryScreen;
