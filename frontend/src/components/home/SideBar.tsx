import useMeasure from "react-use-measure"
import channel1 from "/channel1.png"
import channel2 from "/channel2.png"
import channel3 from "/channel3.png"
import channel4 from "/channel4.png"
import home from "/home.svg"
import search from "/search.svg"
import leader from "/leader.svg"
import bag from "/bag.svg"
import addchannel from "/addchannel.svg"
import explore from "/explore.svg"

interface side_bar {
    w:number,
    h:number,
    buttomMargine:number,
}

function SideBar() {

    const [ref_sidebar, data] = useMeasure()


    const scalSideBar:side_bar = {
        w: data.height * (15 / 100),
        h: (data.height / 11) - (data.height * (5 / 100)),
        buttomMargine:data.height * (2.6 / 100),
    }

    
    function signOut() {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    console.log("NAVBAR HEIGHT: ", data.height)

    return (
        <aside ref={ref_sidebar} id="default-sidebar" className={`fixed top-0 left-0 z-40 w-[10vw] h-[90vh] transition-transform overflow-hidden`} aria-label="Sidebar">
            
            <div className="h-full w-full pt-[18vh]">
                <ul className={`space-y-[${scalSideBar.buttomMargine}px]`}>
                    <li>
                        <a id="home" href="#" className={`flex justify-center`}>
                        <img  src={home} alt="img" className={`h-[${scalSideBar.h }px]`}/>                            
                        </a>
                    </li>
                    <li>
                        <a id="search" href="#" className="flex justify-center ">
                        <img  src={search} alt="img" className={`h-[${scalSideBar.h}px]`}/>                            
                        </a>
                    </li>
                    <li>
                        <a  id="leader" href="#" className="flex justify-center ">
                        <img  src={leader} alt="img" className={`h-[${scalSideBar.h}px]`}/>
                        </a>
                    </li>
                    <li>
                        <a id="shope" href="#" className="flex justify-center ">
                        <img  src={bag} alt="img" className={`h-[${scalSideBar.h}px]`}/>
                        </a>
                    </li>


                    <li className="flex justify-center p-2">
                        <div style={{ background: "rgba(217, 217, 217, 0.36)" }} className="w-[50%] h-[1px] ">
                        </div>
                    </li>

                    {/* <li className="flex justify-center">
                        <div style={{ background: "background: url(<frontend/public/assets/Defaultchannl2.png>)" }} className="w-[80px] h-[1px] ">
                        </div>
                    </li> */}

                    <li className="flex justify-center">
                            <img src={channel1} alt="img" className={`rounded-[20px] w-[${scalSideBar.h}px]`}/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel2} alt="img" className={`rounded-[20px] w-[${scalSideBar.h}px]`}/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel3} alt="img" className={`rounded-[20px] w-[${scalSideBar.h}px]`}/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel4} alt="img" className={`rounded-[20px] w-[${scalSideBar.h}px]`}/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={addchannel} alt="img" className={`rounded-[20px] w-[${scalSideBar.h - 6}px]`}/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={explore} alt="img" className={`rounded-[20px] w-[${scalSideBar.h - 6}px]`}/>   
                    </li>
                </ul>

            </div>
        </aside>
    )
}

export default SideBar;