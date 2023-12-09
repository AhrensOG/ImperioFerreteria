import React from "react";

const ImageCard = ({ image, removeImage }) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center border border-blue-800 py-1 px-3  rounded-3xl text-blue-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0040AF"
        className="w-5 h-5 cursor-pointer"
        onClick={() => removeImage(image)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {
        image.name.length > 10
        ? (image.name.slice(0, 10) + '...' )
        : image.name
      }
    </div>
  );
};

export default ImageCard;
