import React from 'react';
import styled from 'styled-components';
import Item from './item';
import ToggleButton from './togglebutton'; // Assuming you have a ToggleButton component
import Knife from './knife';


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
  return (
    <InventoryGrid>
      <InventoryColumn>
      <div className="p-2 text-white text-xl font-bold">Pistols</div>

        <Item />
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
    </InventoryGrid>
  );
};

export default InventoryScreen;
