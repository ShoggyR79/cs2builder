import React from "react";

export const OptionsModal = ({ isOpen, onClose, onSaveAndShare }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="opacity-50 fixed inset-0 bg-black" onClick={onClose}></div>
            <button
                onClick={onClose}
                className="absolute top-5 right-5 m-4 z-50 text-5xl text-white hover:text-gray-300"
            >
                ×
            </button>
            <div className="relative z-50 flex justify-center p-5 w-2/4 overflow-y-auto" style={{maxHeight:"50vh", minHeight:"50vh"}}>
                <div className="flex bg-[#2e2e2c] text-white w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                    <div className="flex justify-between items-start w-full p-4">
                        <span className="text-lg font-semibold py-2">Save and Generate Share Link</span>
                        <button
                            onClick={onSaveAndShare}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
