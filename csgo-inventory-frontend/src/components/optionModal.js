import React from "react";

export const OptionsModal = ({
    isOpen,
    onClose,
    onSaveAndShare,
    onReset,
    showInfo,
    setShowInfo,
}) => {
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
            <div className="relative z-50 flex justify-center p-5 w-11/12 sm:w-3/4 md:w-2/4 overflow-y-auto" style={{ maxHeight: "50vh", minHeight: "50vh" }}>
                <div className="flex flex-col bg-[#2e2e2c] text-white w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                    <div className="flex justify-between items-start w-full p-4">
                        {/* Toggle Item Info Button */}
                        <span className="text-lg font-semibold py-2">Toggle Item Info</span>
                        <button
                            onClick={setShowInfo}
                            className={`${showInfo ? 'bg-orange-500 hover:bg-orange-700' : 'bg-green-500 hover:bg-green-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        >
                            {showInfo ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="flex justify-between items-start w-full p-4">
                        {/* Save Button */}
                        <span className="text-lg font-semibold py-2">Save and Share</span>
                        <button
                            onClick={onSaveAndShare}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>
                    </div>
                    <div className="flex justify-between items-start w-full p-4">
                        {/* Reset Button */}
                        <span className="text-lg font-semibold py-2">Reset Loadout</span>
                        <button
                            onClick={onReset}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="mt-auto w-full text-center p-4 text-sm self-end">
                        <span>Reach out to us if you'd like to see a feature added!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
