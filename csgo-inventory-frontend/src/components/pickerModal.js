import React, { useState } from "react";

export default function Modal({ showModal, onModalClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Define the button click handlers if needed
  const handleSwapWeapon = () => {
    console.log('Swap weapon clicked');
    // Implement the swap weapon functionality
  };

  const handleSave = () => {
    console.log('Save clicked');
    // Implement the save functionality
  };

  // Hardcoded images
  const mainImage = "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWdY781lxLuW8Njw31Dn8xc_YTqmJ4DDJFM2ZwqE_ATtx-u7g8C5vpjOzHM263E8pSGKJ1XuG9M/750x900";
  const choiceImages = new Array(20).fill(mainImage).map((url, index) => ({ id: index, url }));

  return (
    <>
      {showModal ? (
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
                <img src={mainImage} alt="Main" className="rounded-lg" style={{ maxHeight: '75vh' }} />
                <h2 className="text-3xl font-bold text-center">AK-47 | Aquamarine Revenge</h2>
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
                  {choiceImages.map(image => (
                    <div key={image.id} className="flex flex-col items-center p-2 border border-gray-700 transition duration-300 ease-in-out hover:scale-105 hover:border-gray-500">
                      <img src={image.url} alt={`AK-47 | Aquamarine Revenge ${image.id}`} className="rounded-lg h-40" />
                      <p className="mt-2 text-xs">AK-47 | Aquamarine Revenge</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
