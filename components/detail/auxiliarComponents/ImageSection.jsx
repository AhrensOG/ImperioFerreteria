import React from "react";

const ImageSection = ({ image }) => {
    return (
        <div className="h-[500px] w-[500px]">
            <img src={image} alt={image} className="h-full w-full" />
        </div>
    );
};

export default ImageSection;
