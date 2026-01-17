import { useState,useEffect,useCallback,useMemo } from "react";
import axios from "../utils/axios"
import Drawer,{ type DrawerTab } from "../components/Drawer";
import AddContentModal from "../components/Modals/AddContentModal";
import ShareBrainModal from "../components/Modals/ShareBrainModal";
import NoteCard from "../components/NoteCard";
import YouTubeCard from "../components/YouTubeCard";
import TweetCard from "../components/TweetCard";
import LinkCard from "../components/LinkCard";
import ChatBot from "../components/ChatBot";
import ChatBotButton from "../components/ChatBotButton";

type ContentCategory='NOTE' | 'TWEET' | 'VIDEO' | 'LINK'


interface contentType{
    title:string,
    body:string,
    url:string|null,
    type:ContentCategory,
    id:string,
    createdAt:string,
    userId:string
}


const tabTypeMap: Record<Exclude<DrawerTab,'Dashboard'>, ContentCategory> = {
    Notes: "NOTE",
    Twitter: "TWEET",
    Youtube: "VIDEO",
    Links: "LINK",
};

const Dashboard = () => {

    const [selectedTab, setSelectedTab] = useState<DrawerTab>('Dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isChatBotOpen, setIsChatBotOpen] = useState(false);
    const [contentData,setContentData]=useState<contentType[]>([
        
    ]);

    const fetchContents = useCallback(async () => {
        try {
            const res = await axios.get('/content/get-content'); // replace with your backend URL
            if (!res.data.success) throw new Error("Failed to fetch contents");

            const data: contentType[] = await res.data.contents;
            setContentData(data);
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchContents();
    }, [fetchContents]);

    const handleAddContent=async (newContent: {
        type: string;
        title: string;
        body: string;
        url: string|null;
    }) => {
        console.log(newContent);
        try
        {
            const res = await axios.post('/content/add-content', newContent);
            if (!res.data.success) throw new Error("Failed to add content");
            
            //setContentData([...contentData, data]);
            await fetchContents();
        } catch (err){
            console.error(err);
        }

        //axios request to update data in the backend and refetch the data
    };

    const deleteContent=async (id:string)=>{
        console.log(id);
        try
        {
            const res = await axios.delete('/content/delete-content',{
                data:{contentId:id}
            });
            if (!res.data.success) throw new Error("Failed to delete content");
            await fetchContents();
        } catch (err){
            console.error(err);
        }
    };

    const renderCard = (content: contentType) => {
        const formattedDate = new Date(content.createdAt).toLocaleDateString("en-GB"); // "dd/mm/yyyy"

        switch (content.type) 
        {
            case "NOTE":
                return (
                <NoteCard
                    id={content.id}
                    title={content.title}
                    body={content.body}
                    date={formattedDate}
                    onDelete={()=>{deleteContent(content.id)}}
                />
                );

            case "VIDEO":
                return (
                <YouTubeCard
                    id={content.id}
                    title={content.title}
                    body={content.body}
                    url={content.url!}
                    date={formattedDate}
                    onDelete={()=>{deleteContent(content.id)}}

                />
                );
                
            case "TWEET":
                return (
                <TweetCard
                    id={content.id}
                    title={content.title}
                    body={content.body}
                    url={content.url!}
                    date={formattedDate}
                    onDelete={()=>{deleteContent(content.id)}}
                />
                );

            case "LINK":
                return (
                <LinkCard
                    id={content.id}
                    title={content.title}
                    body={content.body}
                    url={content.url!}
                    date={formattedDate}
                    onDelete={()=>{deleteContent(content.id)}}
                />
                );

            default:
                return null;
        }
    };

    const filteredContents = useMemo(() => {
        if (selectedTab === "Dashboard") {
            return contentData;
        }

        const mappedType = tabTypeMap[selectedTab as Exclude<DrawerTab,'Dashboard'>];
        return contentData.filter((content) => content.type === mappedType);
    }, [selectedTab, contentData]);


    return(
        <div>
            <div className={`flex flex-row h-screen bg-gray-100 transition-opacity duration-300 ${isModalOpen || isShareOpen || isChatBotOpen ?'opacity-40':'opacity-100'}`}>
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
                                <div className="flex h-12 p-4 justify-center items-center text-indigo-600 font-semibold" onClick={()=>{setIsShareOpen(true);}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                    Share Brain
                                </div>
                            </button>
                        </div>
                        
                    </div>
                    <div className="m-2 flex flex-row flex-wrap overflow-auto flex-start">
                        {filteredContents.map((content) =>
                        selectedTab === "Dashboard" ? (
                            <div key={content.id}>{renderCard(content)}</div>
                        ) : (
                            <div key={content.id} className="m-2">
                            {renderCard(content)}
                            </div>
                        )
                        )}
                    </div>
                </div>            
            </div>
            {isModalOpen&&<AddContentModal closeModal={()=>{setIsModalOpen(false)}} handleAddContent={handleAddContent}/>}
            {isShareOpen&&<ShareBrainModal closeModal={()=>{setIsShareOpen(false)}}/>} 
            <ChatBot isOpen={isChatBotOpen} onClose={() => setIsChatBotOpen(false)} />
            <ChatBotButton onClick={() => setIsChatBotOpen(true)} />
        </div>
       
    );
    
}

export default Dashboard;