import React from "react";

const CardTablet = ({ img }) => {
    return (
        <div>
            <img
                src={img}
                alt={img}
                className="h-28 w-28 border-2 border-[#e26928] rounded-xl"
            />
        </div>
    );
};

export default CardTablet;
