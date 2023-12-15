import React from "react";

const CardTablet = ({ img }) => {
    return (
        <div>
            <img
                src={img}
                alt={img}
                className="max-w-[240px] max-h-[280px] h-32 w-32 border-2 border-[#e26928] rounded-xl"
            />
        </div>
    );
};

export default CardTablet;
