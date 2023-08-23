import Subtract from "/subtract.svg"
import aamoussa from "/aamoussa.jpeg"
import MessageRecieverCard from "./MessageRecieverCard"
import MessageSenderCard from "./MessageSenderCard"
import useMeasure from "react-use-measure"
import CornerLinedCardTest from "../../CornerLinedCard/CornerLinedCardTest"


interface GeneralChat {
    chatsize:number,
    header_size:number,
    channel_name:number,
    channel_online:number,
    chat_header: {
        title:number,
        description:number,
    }
}

function GeneralChat()
{
    const [header_ref, data] = useMeasure()
    // const data = 400;
    const chat:GeneralChat = {
        chatsize : data.width * (32 / 100),
        header_size:data.width * (16 / 100),
        channel_name:  data.width * (4.15 / 100),
        channel_online: data.width * (2.15 / 100),
        chat_header : {
            title: data.width * (2 / 100),
            description: data.width * (2 / 100)
        }

    }

    return (
        <>
        <section ref={header_ref} id="general-chat" className="flex flex-col gap-[3.5vh] w-[100%]">
          <div className="flex flex-col justify-center ml-[1.19vw]">
            <h1 className={`font-sans text-[${chat.chat_header.title}px] font-extrabold`}>
              Public chat
            </h1>
            <p className={`font-sans text-[${chat.chat_header.description}px] `}>
              Talk to online players in the game
            </p>
          </div>

          <div className={`w-[100%] h-[100%]`}>
            <CornerLinedCardTest
              childComp={
                // w-385     h-444px
                <div className="flex center w-[100%] h-[100%] flex-col ">
                  {/* this card is responsible for chat header */}
                  <div className="flex justify-center items-center w-[100%] h-[16%] ">
                    <div className="w-[80%] h-[60%] ">
                      <p style={{ color: "white" }} id="mode-name" className={`font-sans text-[${chat.channel_name}px] font-extrabold`}>#General</p>
                      <div className="flex items-center gap-[3px]">
                        <div className={`bg-[#D5FF5C] h-[${chat.channel_online}px] w-[${chat.channel_online}px] rounded-full`}></div>
                        <p
                          style={{ color: "#8B8B93" }}
                          id="mode-name"
                          className={`font-sans text-[${chat.channel_online}px]`}
                        >
                          22 player online
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* and this one is resonsible for chat body  */}
                  
                  <div className="relative grid grid-cols-1 bg-[#1E1F23] w-[100%] items-end h-[60%] z-40 border-l-2 border-r-2  overflow-hidden overflow-y-scroll  ">
                    {/* <MessageSenderCard
                      name="Anas"
                      avatar="../../../../public/aamoussa.jpeg"
                      content="hallo"
                    />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard />
                    <MessageRecieverCard /> */}
                  </div>
                    
                  <div
                    id="send-message-parent"
                    className="flex relative  justify-center items-center w-full h-[85px]  "
                  >
                    <input
                      className="bg-[#1E1F23]  focus:outline-none outline-0 rounded-[5px] [color:white]  rounded-br-[0px]  rounded-tr-[0px] w-[82%] h-[50%] placeholder:text-[8px]  placeholder:ml-[10px] text-white "
                      placeholder="Type Your Message"
                      type="text"
                      name="search"
                    />
                    <div className="bg-[#1E1F23]  flex rounded-tr-[5px] rounded-br-[11px] h-[50%] justify-center items-center">
                      <img
                        src={Subtract}
                        alt="send icon"
                        className="h-[15px] w-[15px] mr-[10px]"
                      />
                    </div>
                  </div>
                </div>
              }
              fill="[color:#2C2D33]"
              cornerredius="5"
              stroke="[color:#2C2D33]"
              strokesize={2}
              cornershape={[45, 0, 45, 0]}
              height={444}
              width={385}
              margine="mr-[20px]"
              ratio={115.32 / 100}
            />
          </div>
        </section>
        </>
    )
}

export default GeneralChat
