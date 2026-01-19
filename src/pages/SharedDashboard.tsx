import { useState,useEffect,useCallback,useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios"
import Drawer,{ type DrawerTab } from "../components/Drawer";
import NoteCard from "../components/NoteCard";
import YouTubeCard from "../components/YouTubeCard";
import TweetCard from "../components/TweetCard";
import LinkCard from "../components/LinkCard";

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

const SharedDashboard = () => {
    const { hash } = useParams<{ hash: string }>();
    const [selectedTab, setSelectedTab] = useState<DrawerTab>('Dashboard');
    const [contentData,setContentData]=useState<contentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchContents = useCallback(async () => {
        if (!hash) {
            setError("Invalid share link");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.get(`/share/${hash}`);
            if (!res.data.success) {
                setError("Failed to load shared content");
                return;
            }

            const data: contentType[] = res.data.contents;
            setContentData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load shared content");
        } finally {
            setIsLoading(false);
        }
    }, [hash]);

    useEffect(() => {
        fetchContents();
    }, [fetchContents]);

    const renderCard = (content: contentType) => {
        const formattedDate = new Date(content.createdAt).toLocaleDateString("en-GB");

        switch (content.type) 
        {
            case "NOTE":
                return (
                <NoteCard
                    id={content.id}
                    title={content.title}
                    body={content.body}
                    date={formattedDate}
                    onDelete={()=>{}}
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
                    onDelete={()=>{}}
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
                    onDelete={()=>{}}
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
                    onDelete={()=>{}}
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return(
        <div>
            <div className="flex flex-row h-screen bg-gray-100">
                <Drawer activeTab={selectedTab} setActiveTab={setSelectedTab} showProfile={false}></Drawer>
                <div className="flex flex-col w-full ml-2">
                    <div className="flex justify-between items-center w-full h-20">
                        <div className="flex items-center w-48 pl-4">
                            <h1 className="text-3xl font-bold">All Notes</h1>
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
        </div>
    );
}

export default SharedDashboard;

