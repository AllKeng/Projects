import React, { useState } from "react";
import "../../styles/Tabs.css";

import Login from "./AllTabs/Login";
import Register from "./AllTabs/Register";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    // Functions to handle changing the state of the tab
    const activeLogin = () => {
        // Update to login tab
        setActiveTab("tab1");
    }
    const activeRegister = () => {
        // Update to login tab
        setActiveTab("tab2");
    }

    return (
    <div className="Tabs">
        {/* Tab nav */}
        <ul className="nav">
            <li 
                className={activeTab === "tab1" ? "active" : ""}
                onClick={activeLogin}
                >
                Login
            </li>
            <li
                className={activeTab === "tab2" ? "active" : ""}
                onClick={activeRegister}
                >
                Sign up
            </li>
        </ul>
        <div className="output">
            {activeTab === "tab1" ? <Login /> : <Register />}
        </div>
    </div>
  );
};
export default Tabs;