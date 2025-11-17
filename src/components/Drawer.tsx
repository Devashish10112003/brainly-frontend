import { useEffect, useState } from "react";
export type DrawerTab='Dashboard' | 'Twitter' | 'Youtube' | 'Links' | 'Notes';

interface DrawerProps {
  activeTab: DrawerTab;
  setActiveTab: (tab: DrawerTab) => void;
}

const Drawer=({activeTab,setActiveTab}:DrawerProps)=>{

    const [isDrawerOpen,setIsDrawerOpen]=useState(window.innerWidth>=768)

    useEffect(()=>{
        const handleResize = () =>{
            const isMedium=window.innerWidth<768;
            setIsDrawerOpen(!isMedium);
        };

        handleResize();

        window.addEventListener('resize',handleResize);
      
        return ()=>window.removeEventListener('resize',handleResize);
    },[])

    const navigation=[
        {name: 'Dashboard',svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>},
        {name: 'Twitter', svg: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>},
        {name: 'Youtube', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-youtube"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z" /></svg>},
        {name: 'Links', svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>},
        {name: 'Notes', svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>},
    ]


    return <div className={`${ isDrawerOpen ?'w-80':'w-20'} bg-white h-full border-r border-l border-black transition-[width] duration-300 ease-in-out`}>
        <div className="flex  items-center">
            <svg  xmlns="http://www.w3.org/2000/svg"  
                width="60"  height="60"  viewBox="0 0 24 24"  fill="none"  
                stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  
                stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brain text-indigo-600 my-4 ml-4 mr-4 sm:mr-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
                    <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
                    <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
                    <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
                    <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
                    <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
            </svg>
            {isDrawerOpen && <p className="text-2xl font-semibold">Second Brain</p>}

            
        
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
            
                {navigation.map((item) => {
                    let isActive:boolean;
                    if(activeTab===item.name)
                    {
                        isActive=true;
                    }
                    else
                    {
                        isActive=false;
                    }
                    return (
                    <div onClick={()=>{setActiveTab(item.name as DrawerTab)}} className={`flex items-center px-4 py-2 text-md font-medium rounded-md ${
                        isActive
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}>
                        {item.svg} 
                        <span className="ml-2">{isDrawerOpen && item.name}</span>
                    </div>
                        
                    );
                })}
            </nav>
    </div>
}

export default Drawer;