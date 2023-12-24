import React from "react";

const Card = ({ user }) => {
    return (
        <div className="flex flex-row justify-start items-center gap-2 border border-[#e26928] bg-white p-2">
            <div>
                <img src={user.profileImage} alt="profileImage" className="rounded-xl" />
            </div>
            <div className="text-[#e26928] font-semibold text-sm">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>tel: {user.phone}</p>
                <p>Dirección: {user.address}</p>
            </div>
        </div>
    );
};

export default Card;
