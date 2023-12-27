import React from 'react';

export default function Item(props) {
    return (
        <div className={`col-span-1 border rounded-lg shadow bg-gray-800 border-gray-700 border-b-4 mb-3 flex flex-col items-center hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105`} onClick={props.onClick}>
            {/* Image container with flex properties to center the image */}
            <div className="flex justify-center items-center self-stretch">
                <img className="rounded-t-lg max-h-40" src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.item.icon_url}/130x150/`} alt={props.item.name} />
            </div>
            {/* Text container for the name */}
            <div className="w-full text-center p-2">
                <p className="font-normal text-gray-400 text-xs">{props.item.name}</p>
            </div>
        </div>
    );
}
