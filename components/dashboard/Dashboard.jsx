import React, { useState } from "react";
import SideBar from "./auxiliarComponents/SideBar";

const Dashboard = () => {
    const [bool, setBool] = useState(false);

    const handleChangeBool = () => {
        setBool(!bool);
    };

    return (
        <div>
            <SideBar />
        </div>
    );
};

export default Dashboard;
