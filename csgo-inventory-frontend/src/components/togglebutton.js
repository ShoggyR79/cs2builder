import React, { useState } from 'react';

const ToggleButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <h3 className={`text-xl font-bold mb-3 text-white`}>
                <span className={`${isChecked ? 'text-blue-900' : 'text-yellow-500'}`}>{isChecked ? 'CT' : 'T‎'}</span> Loadout</h3>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isChecked} onChange={handleChange} />
                <div className={`w-11 h-6 ${isChecked ? 'bg-blue-900' : 'bg-yellow-500'} rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
                
            </label>
        </div>

    );
};

export default ToggleButton;
