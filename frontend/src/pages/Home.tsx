// import { Outlet } from "react-router-dom";
import SideBar from '../components/home/Sidebar/SideBar';
import NavBar from '../components/home/NavBar/NavBar';
import FriendsBar from '../components/home/FriendsBar/FriendsBar';
import GameModesTest from '../components/home/GameModesTest/GameModesTest';
import LiveMatchesAndGeneralChat from '../components/home/LiveMatchesAndGeneralChat/LiveMatchesAndGeneralChat';
import useMeasure from 'react-use-measure';

function Home() {
  const [ref, data] = useMeasure();

  return (
    <>
      <div className="home" ref={ref}>
        <NavBar />
        <SideBar />
        <FriendsBar />
        {/* <GameModes/> */}
        <GameModesTest />
      </div>
      <LiveMatchesAndGeneralChat reminder={data.height} />
    </>
  );
}
export default Home;
