interface ChannelProps {
    name: string
    avatar: string
    role: string
}

const ChannelElement: React.FC<ChannelProps> = ({name,avatar,role}) => {
    return (
        <>
        <div className="flex  items-center gap-4 ">
          <img src={avatar} className="rounded-2xl h-[52px] w-[52px]" />
          <h1 className="text-white font-poppins font-medium uppercase">{name}</h1>
        </div>
        <div id="context_menu" className='text-white '>:</div>
        </>
    );
}

export default ChannelElement;