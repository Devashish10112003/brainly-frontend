import { useState} from "react";

type DrawerTab='Note' | 'Tweet' | 'Youtube' | 'Links'
interface AddContentModalProps {
  closeModal: () => void;
   handleAddContent: (content: {
    type: string;
    title: string;
    body: string;
    url: string;
  }) => void;
}


const AddContentModal=({closeModal,handleAddContent}:AddContentModalProps)=>{

    const [selectType, setSelectedType] = useState<DrawerTab>('Note');
    const buttons=[
        {name:"Note",type:"NOTE"},
        {name:"Link",type:"LINK"},
        {name:"Tweet",type:"TWEET"},
        {name:"Youtube",type:"VIDEO"}
    ];

    const [contentData,setContentData]=useState({
        type:'NOTE',
        title:'',
        body:'',
        url:''
    });


    const isUrl=(type:DrawerTab)=>type!== "Note";

    const handleSubmit=(e: React.FormEvent)=>{
        e.preventDefault();
        console.log("Submitted Data:", contentData);
        handleAddContent(contentData);
        closeModal();
    };

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setContentData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange=(tab:DrawerTab,typeValue:string)=>{
        setSelectedType(tab);
        setContentData(prev => ({ ...prev, type: typeValue }));
    };

   

    return <div className="overlay h-full w-full absolute top-0 left-0 flex items-center justify-center" onClick={closeModal}>
        <div className="popup flex items-center justify-center" onClick={(e)=>{e.stopPropagation()}}>
            <form onSubmit={handleSubmit} className={`w-128 bg-indigo-200 rounded-md ${isUrl(selectType)?'h-128':'h-108'}`}>
                <h2 className="text-2xl font-bold text-indigo-800 text-center pt-8">Add Content</h2>
                <div className="flex justify-center pt-2 mt-8">
                    {buttons.map((item)=>{
                        let isActive:boolean;
                        if(selectType===item.name)
                        {
                            isActive=true;
                        }
                        else
                        {
                            isActive=false;
                        }
                        return(<div 
                                    key={item.name}
                                    onClick={()=>handleTypeChange(item.name as DrawerTab,item.type)} 
                                    className={`w-24 py-3 px-2 m-2 font-semibold text-md flex justify-center rounded-sm text-white ${
                                    isActive
                                            ? 'bg-indigo-800 text-indigo-900 '
                                            : 'text-gray-600 hover:bg-indigo-100 hover:text-black bg-indigo-400'
                                        }`}>
                                    {item.name}
                                </div>)
                    })}

                    
                </div>

                <input 
                    type="text" 
                    name="title"
                    value={contentData.title}
                    onChange={handleChange}
                    className="bg-indigo-50 w-[85%] ml-10 my-4 p-3 rounded-md border border-indigo-500" 
                    placeholder="Title"
                />
                <input 
                    type="text" 
                    name="body"
                    value={contentData.body}
                    onChange={handleChange}
                    className="bg-indigo-50 w-[85%] ml-10 my-4 p-3 rounded-md border border-indigo-500" 
                    placeholder="Body"
                />

                {isUrl(selectType)&&(
                    <input 
                        type="text" 
                        name="url"
                        value={contentData.url}
                        onChange={handleChange}
                        className="bg-indigo-50 w-[85%] ml-10 my-4 p-3 rounded-md border border-indigo-500" 
                        placeholder="Url"
                    />
                )}

                <div className="flex w-full justify-center">
                    <button type="submit" className="py-3 px-10 bg-indigo-800 m-2 font-semibold text-md rounded-md text-white hover:bg-indigo-400">Add</button>
                    <button type="button" className="py-3 px-8 bg-indigo-800 m-2 font-semibold text-md rounded-md text-white hover:bg-indigo-400" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    </div> ;

}

export default AddContentModal;