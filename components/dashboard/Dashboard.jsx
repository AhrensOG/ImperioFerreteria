import React from "react";
import SideBar from "./auxiliarComponents/SideBar";
import User from "../user/User";

const Dashboard = () => {
    return (
        <div className="flex flex-row">
            <div className="basis-[20%]">
                <SideBar />
            </div>
            <div className="basis-[40%]">
                <User />
            </div>
        </div>
    );
};

export default Dashboard;
