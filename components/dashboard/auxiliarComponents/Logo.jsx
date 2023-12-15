import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <div className="flex justify-center py-10 ">
            <Link href={'/'}>
                <Image src={"/Logo.png"} width={150} height={150} alt="Logo" />
            </Link>
        </div>
    );
};

export default Logo;
