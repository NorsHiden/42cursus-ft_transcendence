// import { Outlet } from "react-router-dom";
import SideBar from "../components/home/SideBar";
import NavBar from "../components/home/NavBar";
import FriendsBar from "../components/home/FriendsBar";
// import ButtonAct from "../components/home/ButtonAct";
import GameModes from "../components/home/GameModes";
import GameModesTest from "../components/home/GameModesTest";
import CornerLinedCard from "../components/CornerLinedCard/CornerLinedCard";

import LiveMatchesAndGeneralChat from "../components/home/LiveMatchesAndGeneralChat/LiveMatchesAndGeneralChat";


function Home() {
    
    return (
        <div className="home">
            <NavBar/>
            <SideBar/>
            <FriendsBar/>          
            {/* <GameModes/> */}
            <GameModesTest/>
            <LiveMatchesAndGeneralChat />
            {/* <LiveMatches/>
            <GeneralChat/> */}
            {/* <CornerLinedCard  
                childComp = {

                    <div className="center w-[385px] h-[74px] bg-white">
                        dasdasa
                    </div>
                }
                fill="[color:#1E1F23]" cornerredius="5" stroke="[color:#2C2D33]" strokesize={3} cornershape={[45,0,45,0]} width={385} height={444} margine="mr-[20px]"  /> */}

            {/* <ButtonAct/> */}
            {/* <FriendsBar/> */}
        </div>
    )
}
export default Home