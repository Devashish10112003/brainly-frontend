import { useState } from "react";
import Drawer from "../components/Drawer";

const Dashboard = () => {

    const [selectedTab, setSelectedTab] = useState<'Dashboard' | 'Twitter' | 'Youtube' | 'Links' | 'Notes'>('Dashboard');


    return(
        <div className="flex flex-col h-screen">
            <Drawer activeTab={selectedTab} setActiveTab={setSelectedTab}></Drawer>
        </div>
    );
    
}

export default Dashboard;