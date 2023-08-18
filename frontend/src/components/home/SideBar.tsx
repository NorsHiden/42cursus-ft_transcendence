import useMeasure from "react-use-measure"
import channel1 from "/channel1.png"
import channel2 from "/channel2.png"
import channel3 from "/channel3.png"
import channel4 from "/channel4.png"
import home from "/home.svg"
import search from "/search.svg"
import leader from "/leader.svg"
import bag from "/bag.svg"

interface side_bar {
    w:number,
    h:number,
}

function SideBar() {

    const [ref_sidebar, data] = useMeasure()

    const scalSideBar:side_bar = {
        w: data.height * (15 / 100),
        h:5,
    }

    console.log("sideBar",data.height)

    function signOut() {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <aside ref={ref_sidebar} id="default-sidebar" className={`fixed top-0 left-0 z-40 w-[161px] h-[60vh] transition-transform -translate-x-full sm:translate-x-0`} aria-label="Sidebar">
            
            <div className="h-full h-full pt-[180px]">
                <ul className="space-y-[24PX]">
                    <li>
                        <a id="home" href="#" className="flex justify-center p-2">
                        <img  src={home} alt="img" className=" lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>                            
                        </a>
                    </li>
                    <li>
                        <a id="search" href="#" className="flex justify-center p-2">
                        <img  src={search} alt="img" className=" lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>                            
                        </a>
                    </li>
                    <li>
                        <a  id="leader" href="#" className="flex justify-center p-2 ">
                        <img  src={leader} alt="img" className=" lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>
                        </a>
                    </li>
                    <li>
                        <a id="shope" href="#" className="flex justify-center p-2">
                        <img  src={bag} alt="img" className=" lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>
                        </a>
                    </li>


                    <li className="flex justify-center py-[39px]">
                        <div style={{ background: "rgba(217, 217, 217, 0.36)" }} className="w-[80px] h-[1px] ">
                        </div>
                    </li>

                    {/* <li className="flex justify-center">
                        <div style={{ background: "background: url(<frontend/public/assets/Defaultchannl2.png>)" }} className="w-[80px] h-[1px] ">
                        </div>
                    </li> */}

                    <li className="flex justify-center">
                            <img src={channel1} alt="img" className="rounded-[20px] lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel2} alt="img" className="rounded-[20px] lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel3} alt="img" className="rounded-[20px] lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel4} alt="img" className="rounded-[20px] lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] sm:h-[15px] lg:w-[15px]"/>   
                    </li>
                    <li className="flex justify-center">
                        <button onClick={signOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Log Out
                        </button>
                    </li>
                </ul>

            </div>
        </aside>
    )
}

export default SideBar;