import Logo from "/logo.svg"
import parrametre from "/parrametre.svg"
import notification from "/notification.svg"
import chat from "/chat.svg"

function NavBar()
{
    return (
        <div className="fix mr-[14vw] pt-[4vh] pl-[3vw]">
            
<nav className="">
          <div className=" flex flex-wrap items-center justify-between ">
            <img className="h-[5vh] " src={Logo} alt="" />
            <div className="flex items-center md:order-2">

              <div className="flex items-center ">
                <div className="pr-[1.87vw]">
                  <button>
                    {/* parrametre */}
                    <img  src={parrametre} alt="img" className="h-[2.31vh] w-[2.31vh]"/>
                  </button>
                </div>
                <div className="pr-[1.87vw]">
                  <button>
                    {/* chat */}
                    <img  src={chat} alt="img" className="h-[2.31vh] w-[2.31vh]"/>
                  </button>
                </div>
                <div className="pr-[1.87vw]">
                  <button>
                    {/* chat */}
                    <img  src={notification} alt="img" className="h-[2.31vh] w-[2.31vh]"/>
                  </button>
                </div>
              </div>
              <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                {/* <span className="sr-only">Open user menu</span> */}
                <img className="h-[5.64vh] w-[5.64vh] rounded-full" src="/public/aamoussa.jpeg" alt="user photo" />
              </button>
              <div >
                <p className=" font-sans text-[1vw] ml-[0.72vw] font-extrabold ">HxX</p>
                <p className="font-sans text-[0.5vw] font-extrabold ml-[0.72vw]  text-[#5E6069] ">@hunter</p>
              </div>
            </div>
          </div>
</nav>

        </div>
    )   
}

export default NavBar