import React from "react";

const ImageSection = ({ image }) => {
    return (
        <div className="h-auto w-full flex justify-center ">
            <img
                src={image}
                alt={image}
                className="h-[400px] w-[600px] lg:w-[800px] "
            />
        </div>
    );
};

export default ImageSection;
