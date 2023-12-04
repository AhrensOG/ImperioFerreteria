import React from "react";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex justify-center py-10 ">
            <Image src={"/Logo.png"} width={150} height={150} alt="Logo" />
        </div>
    );
};

export default Logo;
