import React, { useState } from 'react';

export const LinkModal = ({ isOpen, link, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            // clipboard successfully set
            setCopied(true);
            // Remove the copied state after a delay
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        }, () => {
            // clipboard write failed
            // handle the error case
        });
    };

    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center ${!isOpen ? 'hidden' : ''}`}>
            <div className="opacity-50 fixed inset-0 bg-black" onClick={onClose}></div>
            <button
                onClick={onClose}
                className="absolute top-5 right-5 m-4 z-50 text-5xl text-white hover:text-gray-300"
            >
                ×
            </button>
            <div className="relative z-50 flex justify-center p-5" style={{minWidth:"65vw", maxWidth:"65vw"}}>
                <div className={`flex flex-col bg-[#2e2e2c] text-white max-w-md w-full rounded-lg overflow-hidden shadow-lg p-4`}>
                    <p className="text-med text-semibold">Sharable Link:</p>
                    <div className="border-2 border-gray-200 flex justify-between items-center mt-4 p-2">
                        {/* SVG and Input Elements */}
                        <input className="w-full outline-none bg-transparent mx-2" type="text" placeholder="link" value={link} readOnly />
                        <button
                            onClick={handleCopy}
                            className={`transition duration-400 ease-in-out ${
                                copied ? 'bg-green-400' : 'bg-indigo-500 hover:bg-indigo-600'
                            } text-white rounded text-sm py-2 px-5`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkModal;
