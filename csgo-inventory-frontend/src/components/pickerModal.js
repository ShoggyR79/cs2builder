import React, { useEffect, useState } from "react";
import config from "../config/config.js";

export default function Modal({ item, showModal, onModalClose, setLoading, saveModal, side }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [choices, setChoices] = useState([]);
  const [weaponChoices, setWeaponChoices] = useState([]);
  const [isChoosingWeapons, setIsChoosingWeapons] = useState(false);
  const [newItem, setNewItem] = useState(null);
  // Define the button click handlers if needed
  const handleSwapWeapon = async () => {
    console.log('Swap weapon clicked');
    // Implement the swap weapon functionality
    // 1 set loading
    // call api
    //
    if (isChoosingWeapons) {
      setLoading(true);
      console.log(newItem.specific_type)
      fetch(`/v1/loadout/skins?specific_type=${newItem.specific_type}`)
        .then(res => res.json())
        .then(
          (result) => {
            setNewItem(newItem);
            setChoices(result);
            setTimeout(() => {
              setLoading(false);
            }, 200);
          },
          (error) => {
            console.log(error)
          }
        );
    }
    setIsChoosingWeapons(!isChoosingWeapons);
  };

  const handleSave = () => {
    console.log('Save clicked');
    setLoading(true);
    saveModal(newItem);
    setTimeout(() => {
      setLoading(false);
    }, 100)
    // Implement the save functionality
  };

  useEffect(() => {
    // Fetch the choices from the backend
    // setChoices(choicesFromBackend);
    setIsChoosingWeapons(false);
    if (item) {
      setLoading(true);
      let specific_type = item.specific_type;
      if (item.type === 'Gloves') {
        specific_type = 'Gloves';
      } else if (item.type === 'Agent') {
        specific_type = 'Agent';
      }
      fetch(`/v1/loadout/skins?specific_type=${specific_type}`)
        .then(res => res.json())
        .then(
          (result) => {
            setNewItem(item);
            setChoices(result)
          },
          (error) => {
            console.log(error)
          }
        );
      if (item.name === 'Knife' || item.weapon_type === 'Knife') {
        specific_type = 'Knife';
      }
      fetch(`/v1/loadout/weapons?specific_type=${specific_type}&side=${side ? 'T' : 'CT'}`)
        .then(res => res.json())
        .then(
          (result) => {
            setWeaponChoices(result)
            setLoading(false);
          },
          (error) => {
            console.log(error)
          }
        );
    }
    return () => {
      // cleanup states
      setChoices([]);
      setWeaponChoices([]);
      setNewItem(null);
      setIsChoosingWeapons(false);
      setSearchTerm("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  // Hardcoded images

  const changeItem = (item) => {
    setLoading(true);
    setNewItem(item);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }
  return (
    <>
      {showModal && newItem ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="opacity-50 fixed inset-0 bg-black" onClick={() => onModalClose()}></div>
          {/* Close Button */}
          <button
            onClick={() => onModalClose()}
            className="absolute top-5 right-5 m-4 z-50 text-5xl text-white hover:text-gray-300"
          >
            ×
          </button>
          <div className="relative z-50 flex justify-center p-5">
            <div className={`flex bg-[#2e2e2c] text-white max-w-6xl w-full rounded-lg overflow-hidden shadow-lg`}>
              {/* Main Image Container with Heading */}
              <div className="w-1/2 flex flex-col justify-center p-5 space-y-4">
                <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${newItem.icon_url}/750x900`} alt="Main" className="rounded-lg" style={{ maxHeight: '75vh' }} />
                <h2 className="text-3xl font-bold text-center">{newItem.name}</h2>
                {/* Buttons */}
                <div className="flex justify-center space-x-4 p-5">
                  {newItem.type === 'Gloves' || newItem.type === 'Agent' ? <></> :
                    <button onClick={handleSwapWeapon} className="bg-[#EA8C55] text-white font-bold py-2 px-4 rounded">
                      {isChoosingWeapons ? "Choose Skin" : (newItem.weapon_type === "Knife" ? "Swap Knife" : "Swap Weapon")}
                    </button>
                  }

                  <button onClick={handleSave} className="bg-[#C75146] text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </div>
              </div>
              {/* Scrollable Grid Container */}
              <div className="w-1/2 flex flex-col p-5 min-h-max	">
                {/* Search Box */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { console.log("change"); setSearchTerm(e.target.value) }}
                  placeholder="Search..."
                  className="mb-4 p-2 rounded bg-gray-700 placeholder-gray-400"
                />
                <div className={`grid grid-cols-2 gap-2  place-content-start overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600 pr-2`} style={{ minHeight: '75vh', maxHeight: '75vh' }}>
                  {isChoosingWeapons ? weaponChoices.filter((weapon) => {
                    return weapon.name_normalized.includes(searchTerm.toLowerCase());
                  }).map(item => (
                    <div key={item.classid} style={{ maxHeight: '20vh' }} className="flex flex-col items-center p-2 hover:bg-[#85877e] w-full border border-gray-700 transition duration-300 ease-in-out hover:scale-105 " onClick={() => changeItem(item)}>
                      <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/175x300/`} alt={item.name} className="rounded-lg h-40" />
                      <p className="mt-2 text-xs">{item.name}</p>
                    </div>
                  )) : choices.filter((choice) => {
                    return choice.name_normalized.includes(searchTerm.toLowerCase());
                  }).map(item => {
                    console.log(item)
                    return (
                      <div key={item.classid} style={{ maxHeight: '30vh', borderBottomColor: `#${item.rarity_color}` }} className="flex flex-col rounded-lg  items-center p-2 hover:bg-[#85877e] w-full border-b-2  border border-gray-700 transition duration-300 ease-in-out hover:scale-105 " onClick={() => changeItem(item)}>
                        <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/175x300/`} alt={item.name} className="rounded-lg h-40" />
                        <p className="mt-2 text-xs">{item.name}</p>
                      </div>
                    )
                  })}
                  {/* need to update with the correct items */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
