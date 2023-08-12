// import ButtonAct from "./ButtonAct"
import channel1 from "../../../public/channel1.png"
import channel2 from "../../../public/channel2.png"
import channel3 from "../../../public/channel3.png"
import channel4 from "../../../public/channel4.png"
import CornerLinedCard from "../CornerLinedCard/CornerLinedCard"

function FriendsBar(){
    return (
        
        <aside id="default-sidebar" className="fixed top-0 right-0 z-40 w-[161px] h-screen transition-transform -translate-x-full sm:translate-x-0 " aria-label="Sidebar">
            <div id="friends-header-side-bar" className="mt-[50px]">
                <div className="flex flex-col w-full justify-center items-center">
                    <h2 className="font-sans extra-bold text-[18px]">FRIENDS</h2>
                    <CornerLinedCard childComp={
                            <h2 style={{ color: "black" }} className="center font-sans text-[12px] font-extrabold "> online </h2>
                        } fill="[color:#D5FF5C]" cornerredius="1" stroke="[color:#E0FF85]"  cornershape={[5,0,5,0]} strokesize={0} width={66} height={18} margine="" />
            
            </div>
            </div>
            <div className="relative w-full h-full pt-[100px]">
                <ul className="relative w-full h-full space-y-[24PX]">
                    <li className="realatve w-full flex justify-center">
                        <div  id="avatar" className="relative flex bannerimg justify-end w-[64px] h-[64px]  rounded-full ">
                            <div id="online-icon" className=" w-[12px] h-[12px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]"></div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                        
                        <div  id="avatar" className="relative flex bannerimg justify-end w-[64px] h-[64px]  rounded-full ">
                            <div id="online-icon" className=" w-[12px] h-[12px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]"></div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                    <div  id="avatar" className="relative flex bannerimg justify-end w-[64px] h-[64px]  rounded-full ">
                            <div id="online-icon" className=" w-[12px] h-[12px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]"></div>
                            </div>
                    </li>
                    <li className="flex justify-center">
                    <div  id="avatar" className="relative flex bannerimg justify-end w-[64px] h-[64px]  rounded-full ">
                            <div id="online-icon" className=" w-[12px] h-[12px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>

        
    )   
}

export default FriendsBar