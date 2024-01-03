import React from 'react';

const ToggleButton = ({ side, onToggle }) => {

    const handleChange = () => {
        onToggle();
    };

    return (
        <div className='flex flex-row sm:flex-col'>
            <span className={`text-xl font-bold mb-3 text-white inline-flex items-center`}>
                {side ? 'T' : 'CT'} <span className='hidden sm:inline ml-1'>Loadout</span></span>
            <label className="relative sm:inline-flex items-center cursor-pointer ml-2 sm:ml-0">
                <input type="checkbox" defaultValue className="sr-only peer" checked={side} onChange={handleChange} />
                <div className="w-11 h-6 bg-blue-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-blue-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400" />
            </label>

        </div>

    );
};

export default ToggleButton;
