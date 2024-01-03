import React, { useEffect, useState } from "react";
import config from "../config/config.js";
import { formatPrice } from "./item.js";

export default function Modal({ item, showModal, onModalClose, setLoading, saveModal, side }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [choices, setChoices] = useState([]);
  const [weaponChoices, setWeaponChoices] = useState([]);
  const [isChoosingWeapons, setIsChoosingWeapons] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState(""); // {price+, price- , name+, name-, rarity+, rarity-} "" = none
  // State for storing window dimensions
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  // Define the button click handlers if needed
  const handleSwapWeapon = async () => {
    // console.log('Swap weapon clicked');
    // Implement the swap weapon functionality
    // 1 set loading
    // call api

    // clear search term
    setSearchTerm("");
    // clear sort by
    setSortBy("");

    if (isChoosingWeapons) {
      setLoading(true);
      // console.log(newItem.specific_type)
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
    setLoading(true);
    saveModal(newItem);
    setTimeout(() => {
      setLoading(false);
    }, 100)
    // Implement the save functionality
  };

  const generateOrder = (itemsArray) => {
    switch (sortBy) {
      case "price+":
        return itemsArray.sort((a, b) => {
          // $NA is the highest price
          if (a.price === "NA") {
            return -1;
          }
          return a.price - b.price;
        });
      case "name+":
        return itemsArray.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      case "rarity+":
        return itemsArray.sort((a, b) => {
          return a.rarity_score - b.rarity_score;
        });
      case "price-":
        return itemsArray.sort((a, b) => {
          // $NA is the highest price
          if (a.price === "NA") {
            return 1;
          }
          return b.price - a.price;
        });
      case "name-":
        return itemsArray.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      case "rarity-":
        return itemsArray.sort((a, b) => {
          return b.rarity_score - a.rarity_score;
        });
      default:
        return itemsArray;
    }
  }

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();
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
      window.removeEventListener('resize', handleResize);
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
            className="absolute top-5 right-5 m-4 z-50 text-5xl text-white hover:text-red-300"
          >
            ×
          </button>
          <div className="relative z-50 flex  justify-center p-5">
            <div style={{ maxHeight: "75vh" }} className={`flex flex-col max-w-95vw sm:max-w-full sm:flex-row bg-[#2e2e2c] text-white max-w-6xl w-3/4 sm:w-full rounded-lg overflow-auto shadow-lg`}>
              {/* Main Image Container with Heading */}
              <div className="w-full sm:w-1/2 flex flex-col justify-center p-5 space-y-4">
                <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${newItem.icon_url}/${parseInt(windowSize.weight / 5)}x${parseInt(windowSize.height / 5)}`} alt="Main" className="object-cover rounded-lg object-scale-down max-h-2/5 sm:max-h-3/4" />
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
              <div className="w-full sm:w-1/2 flex flex-col p-5 h-full">
                <div className="flex flex-col sm:flex-row justify-center ">
                  {/* Search Box */}
                  <div className="flex flex-col justify-center grow">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value) }}
                      placeholder="Search..."
                      className="mb-4 p-2 rounded bg-gray-700 placeholder-gray-400 "
                    />
                  </div>

                  {/* Sort Button and Dropdown */}
                  <div className="relative ml-2 flex justify-center mb-4 ">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-400"
                    >
                      Sort
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full mt-1 py-2 w-48 bg-gray-700 rounded-md shadow-xl z-20 right-auto sm:right-0 transition ease-in-out duration-500">
                        <p
                          onClick={() => { setSortBy('name+'); setIsDropdownOpen(false) }}
                          className="block px-4 py-2 text-sm sm:text-base hover:bg-gray-300 transition duration-500 ease-in-out"
                        >
                          Name (A-Z)
                        </p>
                        <p
                          onClick={() => { setSortBy('name-'); setIsDropdownOpen(false) }}
                          className="block px-4 py-2 text-sm sm:text-base hover:bg-gray-300 transition duration-500 ease-in-out"
                        >
                          Name (Z-A)
                        </p>
                        {!isChoosingWeapons &&
                          <>
                            <p
                              onClick={() => { setSortBy('rarity+'); setIsDropdownOpen(false) }}
                              className="block px-4 py-2 text-sm sm:text-base hover:bg-gray-300 transition duration-500 ease-in-out"
                            >
                              Rarity (Low to High)
                            </p>
                            <p
                              onClick={() => { setSortBy('rarity-'); setIsDropdownOpen(false) }}
                              className="block px-4 py-2 text-sm sm:text-base hover:bg-gray-300 transition duration-500 ease-in-out"
                            >
                              Rarity (High to Low)
                            </p>
                            <p
                              onClick={() => { setSortBy('price+'); setIsDropdownOpen(false) }}
                              className="block px-4 py-2 text-sm sm:text-base hover:bg-gray-300 transition duration-500 ease-in-out"
                            >
                              Price ( Low to High)
                            </p>
                            <p
                              onClick={() => { setSortBy('price-'); setIsDropdownOpen(false) }}
                              className="block px-4 py-2 text-sm sm:text-base hover:bg-gray-300 transition duration-500 ease-in-out"
                            >
                              Price (High to Low)
                            </p>
                          </>
                        }
                      </div>
                    )}
                  </div>
                </div>

                <div className={`grid grid-rows-2 grid-flow-col max-w-3/5 sm:max-w-full sm:grid-flow-row sm:grid-rows-none sm:grid-cols-2 gap-2  place-content-start overflow-x-auto scrollbar-thin overflow-y-hidden sm:overflow-y-auto sm:overflow-x-hidden scrollbar-thumb-gray-900 scrollbar-track-gray-600 pr-2 max-w-full max-h-1/2 sm:min-h-65vh sm:max-h-65vh`}>
                  {isChoosingWeapons ? weaponChoices.filter((weapon) => {
                    return weapon.name_normalized.includes(searchTerm.replace(" ", "").toLowerCase());
                  }).map(item => (
                    <div key={item.classid} className="flex flex-col justify-center max-w-1/5 min-w-2/5 h-auto sm:min-w-fit max-h-45vw sm:max-h-30vh sm:max-w-full rounded-lg items-center p-2 hover:bg-[#85877e] w-full border border-gray-700 transition duration-300 ease-in-out hover:scale-105 " onClick={() => changeItem(item)}>
                      <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/300x300/`} alt={item.name} className="object-fillrounded-lg h-40" />
                      <p className="py-2 text-xs truncate text-semibold">{item.name}</p>
                    </div>
                  )) : generateOrder(
                    choices.filter((choice) => {
                      return choice.name_normalized.includes(searchTerm.replace(" ", "").toLowerCase());
                    })
                  ).map(item => {
                    return (
                      <div
                        key={item.classid}
                        style={{ borderBottomColor: `#${item.rarity_color}` }}
                        className="relative flex flex-col justify-center max-w-1/5 min-w-2/5 h-auto sm:min-w-fit max-h-45vw sm:max-h-30vh sm:max-w-full rounded-lg items-center p-2 hover:bg-[#85877e] w-full border-b-2 border border-gray-700 transition duration-300 ease-in-out hover:scale-105"
                        onClick={() => changeItem(item)}
                      >
                        {/* Wear text */}
                        {
                          item.exterior_short &&
                          <div className="absolute top-0 left-0 m-2 text-white text-sm font-semibold">
                            {item.exterior_short}
                          </div>
                        }

                        {/* Price text */}
                        <div className="absolute top-0 right-0 m-2 text-white text-sm font-semibold">
                          {formatPrice(item.price)}
                        </div>

                        <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/300x300/`} alt={item.name} className="object-fill rounded-lg h-40" />
                        <p className="py-2 text-xs truncate text-semibold">{item.name}</p>
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
