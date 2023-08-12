
// import { blue } from "@mui/material/colors";
import { colors } from "@mui/material"
import CornerLinedCard from "../../CornerLinedCard/CornerLinedCard"
import MatchCard from "./MatchCard"
import { grey } from "@mui/material/colors"
import Subtract from "../../../../public/Subtract.svg"
import aamoussa from "../../../../public/aamoussa.jpeg"
import MessageRecieverCard from "./MessageRecieverCard"
import MessageSenderCard from "./MessageSenderCard"

function LiveMatchesAndGeneralChat() {
    return (
        <div className="flex  mt-[35px] ml-[169px] gap-[10px] mr-[169px]">
            <section id="live-matches" className="flex flex-col w-3/4 gap-[46px]">
                <div id="liveMatches-header" className="flex justify-between items-center">
                    <h1 className="font-sans text-[28px] game-mode-font ">Recent Matches</h1>
                    <div className="flex">
                        <div className="flex items-center ml-[30px]">
                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="" />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ALL</label>
                        </div>
                        <div className="flex items-center ml-[30px]">
                            <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 " />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">live</label>
                        </div>
                        <div className="flex items-center ml-[30px]">
                            <input checked id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4 " />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Done</label>
                        </div>
                        <CornerLinedCard childComp={
                          <div className="center w-[98%] h-[98%] flex justify-center">
                            <select name="language" id="language" className="flex pl-[6px] justify-center w-[100%] [background:none] [color:white]">
                                
                                    <option style={{display:"none"}} value="c++" disabled selected>Sorte by</option>
                                    <option value="javascript" >cursed</option>
                                    <option value="python">Regular</option>
                                    <option value="java">Vanish</option>
                                    <option value="java">Goldrush</option> 
                        </select>                            
                        </div>
                    } fill="[color:#2D313A]" cornerredius="1" stroke="[color:#4B5261]" strokesize={3} width={154} height={33} cornershape={[8,0,8,0]} margine="ml-[39px]"  />

                        

                    </div>
                </div>
                <div id="live-matches-cards" className=" grid grid-cols-3 gap-[20px] overflow-scroll  max-h-[60vh]">
                    <MatchCard class="" />
                    <MatchCard class="" />
                    <MatchCard class="" />
                    <MatchCard class="" />
                    <MatchCard class="" />
                    <MatchCard class="" />
                </div>
            </section>
            <section id="general-chat" className="flex flex-col gap-[46px]">
                <div className="flex flex-col justify-center ml-[43px]">
                    <h1 className="font-sans text-[20px] font-extrabold">Public chat</h1>
                    <p className="font-sans text-[12px] ">Talk to online players in the game</p>
                </div>
                <CornerLinedCard
                    childComp={

                        <div className="flex center w-[385px] h-[444px] flex-col ">

                            {/* this card is responsible for chat header */}
                            <CornerLinedCard
                                childComp={
                                    <div id="chat-header" className="center   w-[385px] h-[85px]">
                                        <div className="flex flex-col gap-[5px] ml-[39px] mt-[19px]">
                                            <p style={{ color: "white" }} id="mode-name" className="font-sans text-[16px] font-extrabold">#General</p>
                                            <div className="flex items-center gap-[3px]">
                                                <div className="bg-[#D5FF5C] h-[7px] w-[7px] rounded-full">
                                                </div>
                                                <p style={{ color: "#8B8B93" }} id="mode-name" className="font-sans text-[8px]">22 player online</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                fill="[color:#2B2F33]" cornerredius="5" stroke="[color:#2B2F33]" strokesize={3} cornershape={[45, 0, 0, 0]} width={385} height={85} margine="z-10" />
                            {/* and this one is resonsible for chat body  */}
                            <div  className="relative grid grid-cols-1 bg-[#1E1F23] w-[100%] items-end h-[60%] z-40 border-l-2 border-r-2  overflow-y-scroll overflow-x-hidden overflow-y-hidden ">
                                <MessageSenderCard name="Anas" avatar="../../../../public/aamoussa.jpeg" content="hallo" />
                                <MessageRecieverCard/>
                                <MessageRecieverCard/>
                                <MessageRecieverCard/>
                                <MessageRecieverCard/>
                                <MessageRecieverCard/>
                                <MessageRecieverCard/>
                            </div>


                            <div id="send-message-parent" className="flex relative  justify-center items-center w-full h-[85px]  ">
                                    <input className="bg-[#1E1F23]  focus:outline-none outline-0 rounded-[5px] [color:white]  rounded-br-[0px]  rounded-tr-[0px] w-[82%] h-[50%] placeholder:text-[8px]  placeholder:ml-[10px] text-white " placeholder="Type Your Message" type="text" name="search"/>                
                                    <div className="bg-[#1E1F23]  flex rounded-tr-[5px] rounded-br-[11px] h-[50%] justify-center items-center">
                                        <img src={Subtract} alt="send icon" className="h-[15px] w-[15px] mr-[10px]"/> 
                                    </div>
                            </div>

                        </div>
                    }
                    fill="[color:#2C2D33]" cornerredius="5" stroke="[color:#2C2D33]" strokesize={3} cornershape={[45, 0, 45, 0]} width={385} height={444} margine="mr-[20px]" />

            </section>
        </div>
    )
}

export default LiveMatchesAndGeneralChat