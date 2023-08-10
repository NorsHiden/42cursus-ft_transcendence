
import { blue } from "@mui/material/colors";
import CornerLinedCard from "../CornerLinedCard/CornerLinedCard"
import Avatar from '@mui/material/Avatar';
import CURSED from "../../../public/Cursedicon.svg"

function LiveMatchesAndGeneralChat()
{
    return (
        <div className="flex justify-between mt-[35px] ml-[169px]">
            <section id="live-matches" className="flex flex-col">
                <div id="liveMatches-header">
                </div>
                <div id="live-matches-cards">
                    <CornerLinedCard childComp={
                        <div className="center w-[386px] h-[212px]">
                            <div id="card-header" className="flex justify-between mt-[26px] ml-[37px] mr-[32px]">
                                <div id="card-mode" className="flex">
                                    <div  className="relative  mr-[12px] mt-[3px] mb-[37px] rounded-full bg-[#3DFFFB] w-[28px] h-[28px]">
                                        <img  src={CURSED} className="center w-[16px] h-[18px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p style={{ color: "#5F5E61" }} id="mode-titel" className="font-sans text-[8px] font-extrabold">MODE</p>
                                        <p style={{ color: "white" }} id="mode-name" className="font-sans text-[16px] font-extrabold">CURSED</p>
                                    </div>
                                </div>
                                <div id="card-time">
                                    <div id="time-border">
                                    </div>
                                    <div id="time-counter">
                                        <p id="title" style={{ color: "#5F5E61" }} className="font-sans text-[8px] font-extrabold">TIME</p>
                                        <p style={{ color: "white" }} className="font-sans text-[16px] font-extrabold">04:23</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-[100%]">
                                <div className="mr-[24px]">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="./public/aamoussa.jpeg"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <p style={{ color: "white" }} className="font-Rowdies text-[36px] font-extrabold">2</p>
                                    <p style={{ color: "white" }} className="font-Rowdies  text-[36px] font-extrabold ml-[18px] mr-[18px]">:</p>
                                    <p style={{ color: "white" }} className="font-Rowdies  text-[36px] font-extrabold">5</p>
                                </div>
                                <div className="ml-[24px]">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="./public/aamoussa.jpeg"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <CornerLinedCard childComp={
                                    <h2 style={{ color: "black" }} className="center font-sans text-[12px] font-extrabold "> live </h2>
                                } fill="[color:#D5FF5C]" cornerredius="1" stroke="[color:#E0FF85]" cornershape={[7, 0, 7, 0]} strokesize={2} width={62} height={18} margine="" />
                            </div>

                        </div>
                                                


                    } fill="[color:#1E1F23]" cornerredius="3" stroke="[color:#2C2D33]" strokesize={3} width={386} height={212} cornershape={[48, 0, 48, 0]} margine="" />

                </div>
            </section>
            <section id="general-chat">

            </section>
        </div>
    )
}

export default LiveMatchesAndGeneralChat