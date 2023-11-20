import { Outlet } from "react-router-dom"
import ProfileTabsView from "../components/profile/ProfileTabs/ProfileTbasView"
import ProfileAboutMeView from "../components/profile/ProfileAboutMe/ProfileAboutMeView"
import { Divider } from "@mui/material"

function Profile(){
    return (
        <>
            <div id="profile" className="grid grid-cols-6 mt-[4.62vh] ml-[8.38vw]  mr-[8.38vw] gap-[1vw]">
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