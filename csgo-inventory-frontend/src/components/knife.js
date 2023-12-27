import React from 'react';

export default function Knife(props) {
    return (
        <div className={`col-span-1 border rounded-lg shadow bg-gray-800 border-gray-700 border-b-[#${props.item.rarity_color}] mb-3 flex flex-col items-center hover:bg-gray-700 cursor-pointer`} onClick={props.onClick}>
            {/* Image container with flex properties to center the image */}
            <div className="flex justify-center items-center self-stretch">
                <img className="rounded-t-lg" src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.item.icon_url}/180x200/`} alt={props.item.name} />
            </div>
            <div className="w-full text-center pb-2">
                <p className="font-normal text-gray-400">{props.item.name}</p>
                {/* Other content */}
            </div>
        </div>
    );
}
