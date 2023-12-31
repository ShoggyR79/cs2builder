import React from 'react';

export const ErrorModal = ({ isOpen, onClose, onConfirm, errorMsg }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="opacity-50 fixed inset-0 bg-black" onClick={handleConfirm}></div>
            <div className="bg-white p-5 z-50 rounded shadow-lg text-center">
                <h2 className="text-xl mb-4 font-bold text-red-600">Error</h2>
                <p>Cannot find loadout with the given ID, redirecting to default loadout.</p>
                <div className="mt-5">
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
