import React, { useState,useRef,useEffect} from 'react';
import ContextMenu from '@components/ContextMenu';
import ContexMenuIcon from '@assets/novaIcons/solid/ContexMenuIcon';

interface ChannelProps {
    name: string
    avatar: string
    role: string
}

const ChannelElement: React.FC<ChannelProps> = ({name,avatar,role}) => {

  
    
    //   const handleClick = (event: MouseEvent) => {
    //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
    //         setVisible(false);
    //     }
    //   };
    
    //   useEffect(() => {
    //     document.addEventListener('mousedown', handleClick);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClick);
    //     };
    // }, []);

    return (
        <>
        <div className="flex  items-center gap-4 ">
          <img src={avatar} className="rounded-2xl h-[52px] w-[52px]" />
          <h1 className="text-white font-poppins font-medium uppercase">{name}</h1>
        </div>
     
        <ContextMenu  menuItems={[{label: 'Leave', onClick: () => console.log('leave'),className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"},
        {label: 'Delete', onClick: () => console.log('delete'),className:"text-white cursor-pointer py-1 px-3 hover:bg-CharcoalGray"},

        ]} />
        </>
    );
}

export default ChannelElement;