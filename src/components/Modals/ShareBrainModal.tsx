import { useState, useEffect } from "react";

interface ShareBrainModalProps{
    closeModal: () => void;
}

const ShareBrainModal=({closeModal}:ShareBrainModalProps)=>{

    const [copied, setCopied] = useState(false);
    const [link, setLink]=useState("");

    useEffect(()=>{
        setLink("BLAH");
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
            <div className={`w-128 bg-indigo-200 rounded-md h-108 flex flex-col items-center justify-center`}>
                <h1 className="pb-8">Share Your Brain!</h1>
                <p className="bg-white p-2 rounded-md">link</p> 
                <button 
                    onClick={handleCopy} 
                    className="px-2 py-1 rounded bg-white mt-2"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
    </div> ;

}

export default ShareBrainModal;