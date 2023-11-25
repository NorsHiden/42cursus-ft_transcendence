import React from 'react';
import SendSolid from '@assets/novaIcons/solid/SendSolid';
import CircleSolid from '@assets/novaIcons/solid/CircleSolid';
import Card from '@components/Card';

const GeneralChat: React.FC = () => {
  const messages = [
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
    'hazeaze',
  ];

  return (
    <section className="col-span-1 hidden 2xl:grid grid-rows-section gap-y-3">
      <header>
        <h1 className="font-serif text-xl text-white">Public Chat</h1>
        <p className="text-sm text-white/70">Talk to online players in the game</p>
      </header>

      <Card
        cut={8}
        fill="#1B191D"
        borderColor="#2C2D33"
        borderWidth={1}
        className="mb-3 grid grid-rows-chat"
      >
        <div className="text-white bg-lightBlack py-6 px-10">
          <h1 className="font-medium text-xl mb-1">#General</h1>
          <p className="flex items-center gap-x-2 text-sm">
            <CircleSolid size={16} className="text-green" />
            22 player online
          </p>
        </div>

        <div className="max-h-full overflow-x-hidden overflow-y-auto p-4 hide-scrollbar">
          {messages.map((message) => {
            return <div>{message}</div>;
          })}
        </div>

        <div className="w-11/12 mx-auto mb-4 text-white flex items-center bg-darkGray pr-5 rounded-full">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-grow py-4 px-5 bg-transparent placeholder:text-gray focus:outline-none"
          />
          <button>
            <SendSolid size={20} className="text-white" />
          </button>
        </div>
      </Card>

      {/* <div className={`w-full h-full`}>
        <div className="flex center w-full h-full flex-col ">
          <div className="flex justify-center items-center w-full h-[16%] ">
            <div className="w-[80%] h-[60%] ">
              <p
                style={{ color: 'white' }}
                id="mode-name"
                className={`font-sans text-lg font-extrabold`}
              >
                #General
              </p>
              <div className="flex items-center gap-x-[3px]">
                <CircleSolid size={16} className="text-green" />
                <p style={{ color: '#8B8B93' }} id="mode-name" className={`font-sans text-sm`}>
                  22 player online
                </p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-1 bg-[#1E1F23] w-full items-end h-[60%] z-40 border-l-2 border-r-2 overflow-hidden overflow-y-scroll">
            <MessageSenderCard
                      name="Anas"
                      avatar="../../../../public/aamoussa.jpeg"
                      content="hallo"
                    />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard /> 
          </div>

          <div
            id="send-message-parent"
            className="flex relative  justify-center items-center w-full h-[85px]  "
          >
            <input
              className="bg-[#1E1F23]  focus:outline-none outline-0 rounded-[5px] [color:white]  rounded-br-[0px]  rounded-tr-[0px] w-[82%] h-[50%] placeholder:text-xs  placeholder:ml-[10px] text-white "
              placeholder="Type Your Message"
              type="text"
              name="search"
            />
            <div className="bg-[#1E1F23]  flex rounded-tr-[5px] rounded-br-[11px] h-[50%] justify-center items-center">
              <SendSolid size={15} />
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default GeneralChat;
