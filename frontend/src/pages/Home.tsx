// import { Outlet } from "react-router-dom";

import GameModesTest from '../components/home/GameModesTest/GameModesTest';
import LiveMatchesAndGeneralChat from '../components/home/LiveMatchesAndGeneralChat/LiveMatchesAndGeneralChat';
import useMeasure from 'react-use-measure';
import SearchView from '../components/home/Search/SearchView';
import { Outlet } from 'react-router-dom';

function Home() {
  const [ref, data] = useMeasure();

  return (
    <>
    
      <Outlet/>

      <div className="home" ref={ref}>
        
        {/* <GameModes/> */}
        <GameModesTest />
      </div>
        <LiveMatchesAndGeneralChat reminder={data.height} />
    </>
  );
}
export default Home;
