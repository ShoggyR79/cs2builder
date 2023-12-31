import React from "react";
import { SocialIcon } from "react-social-icons";

export const FeedbackModal = ({ isOpen, onClose }) => {
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
            <div className="relative z-50 flex justify-center p-5 w-2/4 overflow-y-auto" style={{ maxHeight: "50vh", minHeight: "50vh" }}>
                <div className="flex flex-col bg-[#2e2e2c] text-white w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                    {/* header text  */}
                    <div className="text-lg font-bold p-4 mt-2">
                        Developers and Special Thanks:
                    </div>
                    <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex justify-between items-center w-full p-4">
                        <span className="text-lg font-semibold">ShoggyR79</span>
                        <div>
                            <SocialIcon
                                url={"mailto:cs2builder@gmail.com"}
                                bgColor="transparent"
                            />
                            <SocialIcon
                                url={"https://github.com/ShoggyR79"}
                                bgColor="transparent"
                            />
                            <SocialIcon
                                url={"https://www.reddit.com/user/ShoggyR79"}
                                bgColor="transparent"
                            />
                            {/* <SocialIcon
                                url={"https://steamcommunity.com/id/ShoggyR79/"}
                                bgColor="transparent"
                            /> */}

                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full p-4">
                        <span className="text-lg font-semibold">Kunrius</span>
                        <div>
                            <SocialIcon
                                url={"https://github.com/binhho2607"}
                                bgColor="transparent"
                            />
                            <SocialIcon
                                url={"https://www.reddit.com/user/kunriuss/"}
                                bgColor="transparent"
                            />
                        </div>

                    </div>
                    <div className="flex justify-center items-end w-full p-4">
                        <a href="https://ko-fi.com/C0C6SOXNH" target="_blank" rel="noreferrer"><img height={36} style={{ border: 0, height: 36 }} src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" border={0} alt="Buy Me a Coffee at ko-fi.com" /></a>

                    </div>
                </div>
            </div>
        </div>
    );
};
