import SideBar from '../components/home/Sidebar/SideBar';
import NavBar from '../components/home/NavBar/NavBar';
import FriendsBar from '../components/home/FriendsBar/FriendsBar';
import { Outlet } from 'react-router-dom';

function Route(){
    return (
        <>
            <NavBar />
            <SideBar />
            <FriendsBar />
            <Outlet/>
        </>
    )
}

export default Route