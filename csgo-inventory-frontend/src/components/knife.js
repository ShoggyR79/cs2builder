import React from 'react';

export default function Knife() {
    return (
        <div className="col-span-1 border rounded-lg shadow bg-gray-800 border-gray-700 border-b-indigo-500 mb-3 flex flex-col items-center hover:bg-gray-700 cursor-pointer" onClick={() => console.log("click")}>
            {/* Image container with flex properties to center the image */}
            <div className="flex justify-center items-center self-stretch">
                <img className="rounded-t-lg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWdY781lxLuW8Njw31Dn8xc_YTqmJ4DDJFM2ZwqE_ATtx-u7g8C5vpjOzHM263E8pSGKJ1XuG9M/250x300/" alt="AK-47" />
            </div>
            <div className="w-full text-center pb-2">
                <p className="font-normal text-gray-400">AK-47 | Aquamarine Revenge (Battle-Scarred)</p>
                {/* Other content */}
            </div>
        </div>
    );
}