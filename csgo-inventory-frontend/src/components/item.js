import React from 'react';

export default function Item(props) {
    return (
        <div className="col-span-1 border rounded-lg shadow bg-gray-800 border-gray-700 border-b-indigo-500 mb-3 flex flex-col items-center hover:bg-gray-700 cursor-pointer" onClick={props.onclick}>
            {/* Image container with flex properties to center the image */}
            <div className="flex justify-center items-center self-stretch">
                <img className="rounded-t-lg" src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWdY781lxLuW8Njw31Dn8xc_YTqmJ4DDJFM2ZwqE_ATtx-u7g8C5vpjOzHM263E8pSGKJ1XuG9M/175x300/" alt="AK-47" />
            </div>
            <div className="w-full text-center">
                <p className="pb-2 font-normal text-gray-400" style={{fontSize:"0.75rem"}}>AK-47 | Aquamarine Revenge (Battle-Scarred)</p>
                {/* Other content */}
            </div>
        </div>
    );
}
