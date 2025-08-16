import { useState,useEffect } from "react";
import Drawer from "../components/Drawer";
import AddContentModal from "../components/Modals/AddContentModal";
import ShareBrainModal from "../components/Modals/ShareBrainModal";
import NoteCard from "../components/NoteCard";
import YouTubeCard from "../components/YouTubeCard";
import TweetCard from "../components/TweetCard";
import LinkCard from "../components/LinkCard";

type DrawerTab='NOTE' | 'TWEET' | 'VIDEO' | 'LINK'


interface contentType{
    title:string,
    body:string,
    url:string|null,
    type:DrawerTab,
    id:string,
    createdAt:string,
    userId:string
}


const Dashboard = () => {

    const [selectedTab, setSelectedTab] = useState<'Dashboard' | 'Twitter' | 'Youtube' | 'Links' | 'Notes'>('Dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [contentData,setContentData]=useState<contentType[]>([
        {
            title:"Hey boy how you doing",
            body:'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by',
            url:null,
            type:"NOTE",
            id:"1",
            createdAt:"10/02/25",
            userId:"BLAH"
        },
        {
            title:"Hey boy how you doing",
            body:'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by',
            url:"https://www.youtube.com/watch?v=-sF5KsEo6gM",
            type:"VIDEO",
            id:"1",
            createdAt:"10/02/25",
            userId:"BLAH"
        },
        {
            title:"Hey boy how you doing",
            body:'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by',
            url:"https://twitter.com/BowesChay/status/1951423906881138769",
            type:"TWEET",
            id:"1",
            createdAt:"10/02/25",
            userId:"BLAH"
        },
        {
            title:"Hey boy how you doing",
            body:'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by',
            url:"https://www.google.com/search?q=disney+hotstar&rlz=1C1VDKB_enIN1091IN1091&oq=&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQo3Mjg3MjBqMGo3qAIIsAIB8QXu_H2l8ySQNw&sourceid=chrome&ie=UTF-8",
            type:"LINK",
            id:"1",
            createdAt:"10/02/25",
            userId:"BLAH"
        }

    ]);

    useEffect(() => {
    // const fetchContents = async () => {
    //     try {
    //         const res = await fetch("/api/contents"); // replace with your backend URL
    //         if (!res.ok) throw new Error("Failed to fetch contents");

    //         const data: contentType[] = await res.json();
    //         setContentData(data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     };

    //     fetchContents();
    }, []);

    const handleAddContent=async (newContent: {
        type: string;
        title: string;
        body: string;
        url: string|null;
    }) => {
        console.log(newContent);
        //axios request to update data in the backend and refetch the data
    };

    const deleteContent=async (id:string)=>{
        console.log(id);
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

    const filteredContents =
    selectedTab === "Dashboard"
      ? contentData
      : contentData.filter((c) => {
          if (selectedTab === "Notes") return c.type === "NOTE";
          if (selectedTab === "Youtube") return c.type === "VIDEO";
          if (selectedTab === "Twitter") return c.type === "TWEET";
          if (selectedTab === "Links") return c.type === "LINK";
          return false;
        });


    return(
        <div>
            <div className={`flex flex-row h-screen bg-gray-100 opacity-25 ${isModalOpen || isShareOpen?'opacity-25':'opacity-100'}`}>
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
        </div>
       
    );
    
}

export default Dashboard;