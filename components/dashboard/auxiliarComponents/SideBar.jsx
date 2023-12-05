import React, { useState } from "react";
import Logo from "./Logo";
import List from "./List";
import EndSession from "./EndSession";

const SideBar = () => {
    const [bool, setBool] = useState(false);

    const handleChangeBool = () => {
        setBool(!bool);
    };
    return (
        <div className="relative">
            <div
                className={bool ? "hidden" : "flex w-[20%] pl-4 pt-4"}
                onClick={handleChangeBool}
            >
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.1"
                    viewBox="0 0 17 17"
                    height="2em"
                    width="2em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17 2v1h-17v-1h17zM0 7h17v-1h-17v1zM0 11h17v-1h-17v1zM0 15h17v-1h-17v1z"></path>
                </svg>
            </div>{" "}
            <div
                className={
                    bool
                        ? "flex flex-col h-screen w-[200px] border-r shadow-2xl border-r-[#e26928] absolute transition duration-1000 ease-in"
                        : "left-[-300px] absolute transition duration-1000 ease-in-out"
                }
            >
                <div className="flex pl-4 pt-4" onClick={handleChangeBool}>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        version="1.1"
                        viewBox="0 0 17 17"
                        height="2em"
                        width="2em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z"></path>
                    </svg>
                </div>
                <Logo />
                <List />
                <EndSession />
            </div>
        </div>
    );
};

export default SideBar;
