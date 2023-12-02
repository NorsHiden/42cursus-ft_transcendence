import React from 'react'
import {Outlet} from 'react-router-dom'


const channels = [];

for (let i = 1; i <= 10; i++) {
  channels.push({
    id: i,
    name: `Channel ${i}`,
    avatar: `https://i.pravatar.cc/150?img=${i}`,
    banner: `https://i.pravatar.cc/150?img=${i + 10}`,
    type: 'private',
    protected: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

// console.log(channels);

enum MemberPresence {
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'ingame',
}

interface DirectMessagesProps {
    name: string,
    avatar: string,
    presence:MemberPresence, 
}

const DirectMessages: React.FC = () => {
    return (
        <div className="bg-primary rounded-full h-16"></div>
    )
}

enum MemberRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    MEMBER = 'member',
}

interface ChannelProps {
    name: string
    avatar: string
    role: string
}

const Channel: React.FC<ChannelProps> = ({name,avatar,role}) => {
    return (
        <>
        <div className="flex  items-center gap-4">
          <img src={avatar} className="rounded-xl h-[52px] w-[52px]" />
          <h1 className="text-white font-poppins">{name}</h1>
        </div>
        <div id="context_menu" className='text-white'>:</div>
        </>
    );
}


const Chat: React.FC = () => {
    return (
        <div className="w-full h-full grid grid-cols-4 grid-rows-section gap-x-5 gap-y-8 pt-4">
            <ul  id="chat-nav" className='bg-lightBlack  col-start-1 col-end-1 h-[80vh] rounded-xl'>
            {/* <input className='w-full h-full'/> */}
                {
                    channels.map((channel) => {
                        return (
                            <li key={channel.id} className='flex items-center justify-between p-4 rounded-xl  mr-4 ml-4 h-[68px] hover:bg-gray '>
                                <Channel name={channel.name} avatar={channel.avatar} role={MemberRole.MEMBER}/>
                            </li>
                        )
                    })
                
                }
            </ul>

            <div id='chat-main-pannel' className='bg-lightBlack rounded-xl col-span-3'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Chat