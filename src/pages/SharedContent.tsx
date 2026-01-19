import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
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

const SharedContent = () => {
    const { contentId } = useParams<{ contentId: string }>();
    const [content, setContent] = useState<contentType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContent = async () => {
            if (!contentId) {
                setError("Invalid content link");
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get(`/share/content/${contentId}`);
                if (!res.data.success || !res.data.content) {
                    setError("Content not found or not shared");
                    return;
                }

                setContent(res.data.content);
            } catch (err) {
                console.error(err);
                setError("Failed to load content");
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [contentId]);

    const renderCard = () => {
        if (!content) return null;

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="pt-6 pl-6">
                <div 
                    onClick={() => navigate('/')}
                    className="flex items-center cursor-pointer w-fit"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-brain text-indigo-600 mr-3"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
                        <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
                        <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
                        <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
                        <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
                        <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
                    </svg>
                    <p className="text-2xl font-semibold text-indigo-600">Second Brain</p>
                </div>
            </div>
            <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
                {renderCard()}
            </div>
        </div>
    );
};

export default SharedContent;

