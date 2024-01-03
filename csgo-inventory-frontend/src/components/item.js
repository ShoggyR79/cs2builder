import React, { useEffect, useState } from 'react';

export const formatPrice = (price) => {
    // if price is -1 return N/A
    // otherwise return break with , every 3 digits and two decimals with dollar sign
    return price === -1 ? "N/A" : `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export default function Item(props) {

    // State for storing window dimensions
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

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

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return (
        <div style={{ borderBottomColor: `#${props.item.rarity_color}` }} className={`col-span-1 h-1/6 sm:h-auto border rounded-lg shadow border-gray-700 ${props.tside ? "bg-[#50442a]" : "bg-[#303c4a]"} border-b-4  mb-3 flex flex-col items-center ${props.tside ? "hover:bg-[#302b1b]" : "hover:bg-[#263140]"} cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105`} onClick={props.onClick}>
            {/* Wear text */}
            {
                props.showInfo &&
                props.item.exterior_short &&
                <div className="absolute top-0 left-0 m-2 text-white text-sm font-semibold">
                    {props.item.exterior_short}
                </div>
            }

            {/* Price text */}
            {
                props.showInfo &&
                <div className="absolute top-0 right-0 m-2 text-white text-sm font-semibold">
                    {formatPrice(props.item.price)}
                </div>
            }


            {/* Image container with flex properties to center the image */}
            <div className="flex flex-grow justify-center items-center self-stretch">
                <img className="rounded-t-lg object-cover" src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.item.icon_url}/${Math.max(parseInt(windowSize.width / 10), 70)}x${Math.max(parseInt(windowSize.height / 10), 70)}`} alt={props.item.name} />
            </div>

            {/* Text container for the name */}
            <div className="w-full text-center p-2">
                <p className="font-semibold text-gray-400 text-base tracking-wide truncate">{props.item.name}</p>
            </div>
        </div>
    );
}
