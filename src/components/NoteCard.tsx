import axios from "../utils/axios";

interface NoteCardProp{
    title:string,
    body:string,
    date:string,
    id:string,
    onDelete:(id:string)=>void;
}

const NoteCard=({title,body,date,id,onDelete}:NoteCardProp)=>{
    const handleShare = async () => {
        try {
            await axios.post('/share/content', { contentId: id });
            const shareUrl = `${window.location.origin}/content/${id}`;
            await navigator.clipboard.writeText(shareUrl);
            window.open(shareUrl, '_blank');
        } catch (err) {
            console.error('Failed to share content:', err);
        }
    };
    //for notes
    return <div className="break-inside-avoid bg-white m-2 p-2 rounded-md">
        <div className="flex p-2 justify-between">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <h2 className="text-xl font-semibold w-32 text-ellipsis">{title}</h2>
            </div>
            <div className="flex items-center">
                <div 
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-indigo-50 hover:text-indigo-400 cursor-pointer group"
                    onClick={handleShare}
                    title="Share content"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mx-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-400 cursor-pointer group" onClick={()=>{onDelete(id)}} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mx-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
        {/*h-48 w-68 */}
        <div className="p-4 h-48 w-68 overflow-auto ">
            <p className="text-md">
                {body}
            </p>
        </div>
        <p className="p-2 text-gray-600 text-sm">Added on {date}</p>
    </div>;
}

export default NoteCard;