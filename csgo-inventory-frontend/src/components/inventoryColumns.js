import React, { useState } from 'react';
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
  const openModal = (content) => {
    console.log("in")
    setModalContent("content");
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };
  return (
    <InventoryGrid>
      <InventoryColumn>
      <div className="p-2 text-white text-xl font-bold">Pistols</div>

        <Item  onclick={() => openModal("item1")}/>
        <Item />
        <Item />
        <Item />
        <Item />
      </InventoryColumn>
      <InventoryColumn>
      <div className="p-2 text-white text-xl font-bold">Mid Tier</div>

        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </InventoryColumn>
      <InventoryColumn>
      <div className="p-2 text-white text-xl font-bold">High Tier</div>

        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </InventoryColumn>
      <InventoryColumn>
      <div className="p-2 text-white text-xl font-bold">Knife</div>

        <Knife />
        <div className="p-2 text-white text-xl font-bold">Gloves</div>

        <Knife />
        <div className="p-2 text-white text-xl font-bold">Agent</div>

        <Item />
        
        <ToggleButton />
      </InventoryColumn>
      <PickerModal showModal={isModalOpen} onModalClose={closeModal} />
    </InventoryGrid>
  );
};

export default InventoryScreen;
