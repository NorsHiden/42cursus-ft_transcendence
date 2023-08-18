import Logo from "/logo.svg"
import parrametre from "/parrametre.svg"
import notification from "/notification.svg"
import chat from "/chat.svg"

function NavBar()
{
    return (
        <div className="navbar  lg:pl-[53px] md:pl-[26.5px] sm:pl-[13.2px] lg:mr-[150px] md:mr-[75px] mr-[37.2px]">
            
<nav className="">
          <div className=" flex flex-wrap items-center justify-between mx-auto lg:p-4 md:p-2 p-1">
            <img className="lg:h-[150px] lg:w-[150px] md:h-[100px] md:w-[100px] h-[80px] w-[80px]" src={Logo} alt="" />
            <div className="flex items-center md:order-2">

              <div className="flex items-center ">
                <div className="lg:pr-[36px] md:pr-[18px] pr-[8px]">
                  <button>
                    {/* parrametre */}
                    <img  src={parrametre} alt="img" className=" lg:h-[32px] lg:w-[32px] md:h-[15px] md:w-[15px] h-[6px] w-[6px]"/>
                  </button>
                </div>
                <div className="lg:pr-[36px] md:pr-[18px] pr-[8px]">
                  <button>
                    {/* chat */}
                    <img  src={chat} alt="img" className=" lg:h-[32px] lg:w-[32px] md:h-[15px] md:w-[15px] h-[6px] w-[6px]"/>
                  </button>
                </div>
                <button className="lg:pr-[36px] md:pr-[18px] pr-[8px]">
                  {/* Notification */}
                  <img  src={notification} alt="img" className=" lg:h-[32px] lg:w-[32px] md:h-[15px] md:w-[15px] h-[6px] w-[6px]"/>
                </button>
              </div>
              <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <img className="lg:h-[52px] lg:w-[52px] md:h-[32px] md:w-[32px] h-[15px] w-[15px] rounded-full" src="/public/aamoussa.jpeg" alt="user photo" />
              </button>
              <div >
                <p className="profilename font-sans lg:text-lg md:text-sm text-xs font-extrabold lg:ml-[14px] md:ml-[7px] ml-[2px]">HxX</p>
                <p className="font-sans lg:text-lg md:text-sm text-xs font-extrabold ml-[14px] text-[#5E6069] lg:ml-[14px] md:ml-[7px] ml-[2px]">@hunter</p>
              </div>
            </div>
          </div>
</nav>

        </div>
    )   
}

export default NavBar