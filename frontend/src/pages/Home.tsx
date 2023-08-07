// import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/home/NavBar";
import FriendsBar from "../components/home/FriendsBar";
import ButtonAct from "../components/home/ButtonAct";
import GameModes from "../components/home/GamModes";

function Home() {

    return (
        <div className="home">
            <NavBar/>
            {/* <SideBar/> */}
            <GameModes/>
            {/* <ButtonAct/> */}
            {/* <FriendsBar/> */}
        </div>
    )
}

export default Home