import { Outlet } from "react-router-dom"
import ProfileTabsView from "../components/profile/ProfileTabs/ProfileTbasView"
import ProfileAboutMeView from "../components/profile/ProfileAboutMe/ProfileAboutMeView"
// import { Divider } from "@mui/material"
import axios from "axios"

export async function profileLoader() {
    const res = await fetch('/api/users/@me');
    console.log("res",res)
    if (res.status !== 200) {
      throw new Error('Failed to load user');
    }
    // console.log("data",res.json())
    return res.json();
  }

function Profile(){
    return (
        <>
            <div id="profile" className="grid grid-cols-4 gap-[1vw]">
                <ProfileAboutMeView/>
                <div className="col-span-5 col-start-2">
                    <ProfileTabsView/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Profile