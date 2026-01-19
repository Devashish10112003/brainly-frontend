import { useState, useEffect } from "react";
import axios from "../../utils/axios";

interface ShareBrainModalProps{
    closeModal: () => void;
}

const ShareBrainModal=({closeModal}:ShareBrainModalProps)=>{

    const [copied, setCopied] = useState(false);
    const [link, setLink]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        const shareBrain = async () => {
            setIsLoading(true);
            setError("");
            try {
                const res = await axios.post('/share/brain', { share: true });
                if (res.data.success) {
                    // Convert backend URL to frontend URL
                    const backendUrl = res.data.link;
                    const frontendUrl = backendUrl.replace('/api/v1/share/', '/share/');
                    setLink(`${window.location.origin}${frontendUrl}`);
                } else {
                    setError("Failed to generate share link");
                }
            } catch (err) {
                console.error("Failed to share brain:", err);
                setError("Failed to generate share link");
            } finally {
                setIsLoading(false);
            }
        };
        shareBrain();
    },[]);

    const handleCopy = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy: ", err));
    };

    
    
    return <div className="overlay h-full w-full absolute top-0 left-0 flex items-center justify-center" onClick={closeModal}>
        <div className="popup flex items-center justify-center" onClick={(e)=>{e.stopPropagation()}}>
            <div className={`w-128 bg-indigo-200 rounded-md h-64 flex flex-col`}>
                <h2 className="text-2xl font-bold text-indigo-800 text-center pt-8">Share Your Brain!</h2>
                {error && (
                    <div className="text-red-600 text-sm text-center px-10 mt-2">{error}</div>
                )}
                <div className="flex items-center justify-center flex-1 px-10">
                    {isLoading ? (
                        <div className="text-indigo-800">Generating link...</div>
                    ) : (
                        <input 
                            type="text" 
                            value={link}
                            readOnly
                            className="bg-indigo-50 flex-1 p-3 rounded-md border border-indigo-500 text-gray-800"
                        />
                    )}
                    <button 
                        onClick={handleCopy} 
                        className="ml-2 p-3 bg-indigo-800 rounded-md text-white hover:bg-indigo-400 transition-colors"
                        title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                        {copied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                            </svg>

                        )}
                    </button>
                </div>
            </div>
        </div>
    </div> ;

}

export default ShareBrainModal;