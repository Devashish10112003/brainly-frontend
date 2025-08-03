import { useState } from "react";
import Drawer from "../components/Drawer";
import Card from "../components/Card";
import AddContentModal from "../components/Modals/AddContentModal";

const Dashboard = () => {

    const [selectedTab, setSelectedTab] = useState<'Dashboard' | 'Twitter' | 'Youtube' | 'Links' | 'Notes'>('Dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div>
            <div className={`flex flex-row h-screen bg-gray-100 opacity-25 ${isModalOpen?'opacity-25':'opacity-100'}`}>
                <Drawer activeTab={selectedTab} setActiveTab={setSelectedTab}></Drawer>
                <div className="flex flex-col w-full ml-2">
                    <div className="flex justify-between items-center w-full h-20">
                        <div className="flex items-center w-48 pl-4">
                            <h1 className="text-3xl font-bold">All Notes</h1>
                        </div>
                        <div >
                            <button className="bg-indigo-600 rounded-md mr-2 hover:bg-indigo-500" > 
                                <div className="flex h-12 p-4 justify-center items-center text-white font-semibold" onClick={()=>{setIsModalOpen(true);}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add Content
                                </div>
                            </button>
                            <button className="bg-indigo-200 rounded-md mr-4 hover:bg-indigo-300 ">
                                <div className="flex h-12 p-4 justify-center items-center text-indigo-600 font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                    Share Brain
                                </div>
                            </button>
                        </div>
                        
                    </div>
                    <div className="m-2 flex flex-row flex-wrap">
                        {/* render the card components here */}
                        <Card/>                        
                    </div>
                </div>            
                
            </div>
            {isModalOpen&&<AddContentModal closeModal={()=>{setIsModalOpen(false)}}/>}
        </div>
       
    );
    
}

export default Dashboard;