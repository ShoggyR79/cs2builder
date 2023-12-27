import React, { useEffect, useState } from "react";

export default function Modal({ item, showModal, onModalClose, setLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [choices, setChoices] = useState([]); 
  // Define the button click handlers if needed
  const handleSwapWeapon = () => {
    console.log('Swap weapon clicked');
    // Implement the swap weapon functionality
  };

  const handleSave = () => {
    console.log('Save clicked');
    // Implement the save functionality
  };
  useEffect(() => {
    // Fetch the choices from the backend
    // setChoices(choicesFromBackend);
    if (item) {
      setLoading(true);
      console.log(item.specific_type)
      fetch(`http://localhost:8080/v1/loadout/skins?specific_type=${item.specific_type}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setChoices(result)
          setLoading(false);
        },
        (error) => {
          console.log(error)
        }
      )
    }
    
  }, [item]);
  // Hardcoded images
  return (
    <>
      {showModal && item ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="opacity-50 fixed inset-0 bg-black"></div>
          {/* Close Button */}
          <button
            onClick={() => onModalClose()}
            className="absolute top-5 right-5 m-4 z-50 text-5xl text-white hover:text-gray-300"
          >
            ×
          </button>
          <div className="relative z-50 flex justify-center p-5">
            <div className="flex bg-gray-800 text-white max-w-6xl w-full rounded-lg overflow-hidden shadow-lg">
              {/* Main Image Container with Heading */}
              <div className="w-1/2 flex flex-col justify-center p-5 space-y-4">
                <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/750x900`} alt="Main" className="rounded-lg" style={{ maxHeight: '75vh' }} />
                <h2 className="text-3xl font-bold text-center">{item.name}</h2>
                {/* Buttons */}
                <div className="flex justify-center space-x-4 p-5">
                  <button onClick={handleSwapWeapon} className="bg-[#EA8C55] text-white font-bold py-2 px-4 rounded">
                    Swap Weapon
                  </button>
                  <button onClick={handleSave} className="bg-[#C75146] text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </div>
              </div>
              {/* Scrollable Grid Container */}
              <div className="w-1/2 flex flex-col p-5">
                {/* Search Box */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="mb-4 p-2 rounded text-gray-900 bg-gray-700 placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600 pr-2" style={{ maxHeight: '75vh' }}>
                  {choices.map(item => (
                    <div key={item.classid} className="flex flex-col items-center p-2 border border-gray-700 transition duration-300 ease-in-out hover:scale-105 hover:border-gray-500">
                      <img src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/175x300/`} alt={item.name} className="rounded-lg h-40" />
                      <p className="mt-2 text-xs">AK-47 | Aquamarine Revenge</p>
                    </div>
                  ))}
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
