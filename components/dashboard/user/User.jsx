import React from "react";
import Card from "./auxiliarComponents/Card";

const User = ({ users }) => {
    return (
        <div className="flex flex-col items-center h-screen px-10 py-10">
            <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
                Usuarios
            </span>
            <div className="overflow-y-scroll flex flex-col gap-6 scrollbar-thumb-[#e26928] scrollbar-thin px-1">
                {users.map((u) => {
                    return <Card key={u.id} user={u} />;
                })}
            </div>
        </div>
    );
};

export default User;
