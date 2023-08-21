// import ButtonAct from "./ButtonAct"
import channel1 from "/channel1.png"
import channel2 from "/channel2.png"
import channel3 from "/channel3.png"
import channel4 from "/channel4.png"
import CornerLinedCard from "../CornerLinedCard/CornerLinedCard"
import useMeasure from "react-use-measure"
interface side_bar {
    w:number,
    h:number,
    buttomMargine:number,
    online:number,
}


function FriendsBar(){
    const [ref_sidebar, data] = useMeasure()


    const scalSideBar:side_bar = {
        w: data.height * (15 / 100),
        h: (data.height / 6) - data.height * (5 / 100) - 6,
        buttomMargine:data.height * (5 / 100),
        online: ((data.height / 6) - data.height * (5 / 100)) * (18 / 100)
    }   
    return (
        
        <aside id="default-sidebar" ref={ref_sidebar} className="fixed top-0 right-0 z-40 w-[10vw] h-[60vh] transition-transform -translate-x-full sm:translate-x-0 " aria-label="Sidebar">
            <div id="friends-header-side-bar" className="pt-[4vh]">
                <div className="flex flex-col w-full justify-center items-center">
                    <h2 className="font-sans extra-bold lg:text-[18px] md:text-[8px] text-[4px]">FRIENDS</h2>
                    <CornerLinedCard childComp={
                            <h2 style={{ color: "black" }} className="center font-sans text-[12px] font-extrabold "> online </h2>
                        } fill="[color:#D5FF5C]" cornerredius="1" stroke="[color:#E0FF85]"  cornershape={[5,0,5,0]} strokesize={0} width={66} height={18} margine="" />
            
            </div>
            </div>
            <div className="relative w-full h-full pt-[10vh]">
                <ul className={`relative w-full h-full space-y-[${scalSideBar.buttomMargine}px]`}>
                    <li className="realatve w-full flex justify-center">
                        <div  id="avatar" className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}>
                            <div id="online-icon" className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}></div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                        
                        <div  id="avatar" className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}>
                            <div id="online-icon" className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}></div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                    <div  id="avatar" className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}>
                            <div id="online-icon" className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}></div>
                            </div>
                    </li>
                    <li className="flex justify-center">
                    <div  id="avatar" className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}>
                            <div id="online-icon" className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}></div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                    <div  id="avatar" className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}>
                            <div id="online-icon" className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}></div>
                        </div>
                    </li>
                    <li className="flex justify-center">
                    <div  id="avatar" className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}>
                            <div id="online-icon" className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}></div>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>

        
    )   
}

export default FriendsBar