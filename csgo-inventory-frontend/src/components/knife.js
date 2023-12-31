import React, { useEffect, useState } from 'react';

export default function Knife(props) {
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
        <div style={{ borderBottomColor: `#${props.item.rarity_color}` }} className={`col-span-1 rounded-lg shadow  ${props.tside ? "bg-[#50442a]" : "bg-[#303c4a]"} border-b-4 mb-3 flex flex-col items-center ${props.tside ? "hover:bg-[#302b1b]" : "hover:bg-[#263140]"} cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105`} onClick={props.onClick}>
            {/* Image container with flex properties to center the image */}
            <div className="flex justify-center items-center self-stretch">
                <img className="rounded-t-lg" src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.item.icon_url}/${Math.max(parseInt(windowSize.width / 8), 70)}x${Math.max(parseInt(windowSize.height / 8), 70)}/`} alt={props.item.name} />
            </div>
            <div className="w-full text-center pb-2">
                <p className="font-semibold text-gray-400 text-base tracking-wide">{props.item.name}</p>
                {/* Other content */}
            </div>
        </div>
    );
}
