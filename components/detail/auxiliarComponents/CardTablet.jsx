import React from "react";

const CardTablet = ({ img }) => {
    return (
        <div className="flex flex-col border-2 border-[#e26928] divide-y divide-gray-300 justify-center items-center">
            <img
                src={img}
                alt={img}
                className="max-w-[240px] max-h-[280px] h-32 w-32"
            />
        </div>
    );
};

export default CardTablet;
