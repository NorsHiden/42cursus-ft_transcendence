import useMeasure from 'react-use-measure';
import channel1 from '/channel1.png';
import channel2 from '/channel2.png';
import channel3 from '/channel3.png';
import channel4 from '/channel4.png';
import home from '/home.svg';
import search from '/search.svg';
import leader from '/leader.svg';
import bag from '/bag.svg';
import addchannel from '/addchannel.svg';
import explore from '/explore.svg';
import { NavLink, redirect, useMatch } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
interface side_bar {
  w: number;
  h: number;
  buttomMargine: number;
}

function SideBar() {
  const [ref_sidebar, data] = useMeasure();
  const match = useMatch("/");
  
  console.log(Boolean(match));
  if (Boolean(match) == true)
  {
    return (<Navigate to="/home"/>) 
  }

  const scalSideBar: side_bar = {
    w: data.height * (15 / 100),
    h: data.height / 11 - data.height * (5 / 100),
    buttomMargine: data.height * (2.6 / 100),
  };

  function signOut() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  console.log('NAVBAR HEIGHT: ', data.height);

  return (
    <aside
      ref={ref_sidebar}
      id="default-sidebar"
      className={`fixed top-0 left-0 z-40 w-[10vw] sm:h-[72vh] transition-transform overflow-hidden`}
      aria-label="Sidebar"
    >
      <div className="h-full w-full pt-[18vh]">
        <ul className={`space-y-[${scalSideBar.buttomMargine}px]`}>
          <li>
            <a id="home" href="#" className={`flex justify-center`}>
              <img src={home} alt="img" className={`h-[${scalSideBar.h}px]`} />
            </a>
          </li>
          <li className="">
            {/* <a id="search" href="/home/search" className="flex justify-center "> */}
              <NavLink to="/home/search" className="flex justify-center ">
              <svg
                // className={`h-[${scalSideBar.h}px]`}
                height={scalSideBar.h}
                width={scalSideBar.h}
                viewBox="0 0 33 32"
                fill="#5E6069"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1667 5.33329C10.0121 5.33329 5.83341 9.51197 5.83341 14.6666C5.83341 19.8213 10.0121 24 15.1667 24C20.3214 24 24.5001 19.8213 24.5001 14.6666C24.5001 9.51197 20.3214 5.33329 15.1667 5.33329ZM3.16675 14.6666C3.16675 8.03921 8.53933 2.66663 15.1667 2.66663C21.7942 2.66663 27.1667 8.03921 27.1667 14.6666C27.1667 21.294 21.7942 26.6666 15.1667 26.6666C8.53933 26.6666 3.16675 21.294 3.16675 14.6666Z"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.224 21.7238C22.7447 21.2031 23.5889 21.2031 24.1096 21.7238L29.443 27.0571C29.9637 27.5778 29.9637 28.422 29.443 28.9427C28.9223 29.4634 28.0781 29.4634 27.5574 28.9427L22.224 23.6094C21.7033 23.0887 21.7033 22.2445 22.224 21.7238Z"
                />
              </svg>
              </NavLink>
            {/* </a> */}
          </li>
          <li>
            <a id="leader" href="#" className="flex justify-center ">
              <svg
                height={scalSideBar.h}
                width={scalSideBar.h}
                viewBox="0 0 33 32"
                fill="#5E6069"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.83341 2.66663C6.15152 2.66663 3.16675 5.65139 3.16675 9.33329V22.6666C3.16675 26.3485 6.15152 29.3333 9.83341 29.3333H23.1667C26.8486 29.3333 29.8334 26.3485 29.8334 22.6666V9.33329C29.8334 5.65139 26.8486 2.66663 23.1667 2.66663H9.83341ZM17.8334 10.6666C17.8334 9.93025 17.2365 9.33329 16.5001 9.33329C15.7637 9.33329 15.1667 9.93025 15.1667 10.6666V21.3333C15.1667 22.0697 15.7637 22.6666 16.5001 22.6666C17.2365 22.6666 17.8334 22.0697 17.8334 21.3333V10.6666ZM11.1667 13.3333C11.9031 13.3333 12.5001 13.9302 12.5001 14.6666V21.3333C12.5001 22.0697 11.9031 22.6666 11.1667 22.6666C10.4304 22.6666 9.83341 22.0697 9.83341 21.3333V14.6666C9.83341 13.9302 10.4304 13.3333 11.1667 13.3333ZM21.8334 16C22.5698 16 23.1667 16.5969 23.1667 17.3333V21.3333C23.1667 22.0697 22.5698 22.6666 21.8334 22.6666C21.097 22.6666 20.5001 22.0697 20.5001 21.3333V17.3333C20.5001 16.5969 21.097 16 21.8334 16Z"
                  
                />
              </svg>
            </a>
          </li>
          <li>
            <a id="shope" href="#" className="flex justify-center ">
              <img src={bag} alt="img" className={`h-[${scalSideBar.h}px]`} />
            </a>
          </li>

          <li className="flex justify-center p-2">
            <div
              style={{ background: 'rgba(217, 217, 217, 0.36)' }}
              className="w-[50%] h-[1px] "
            ></div>
          </li>

          {/* <li className="flex justify-center">
                        <div style={{ background: "background: url(<frontend/public/assets/Defaultchannl2.png>)" }} className="w-[80px] h-[1px] ">
                        </div>
                    </li> */}

          <li className="flex justify-center">
            <img
              src={channel1}
              alt="img"
              className={`rounded-[20px] w-[${scalSideBar.h + 20}px]`}
            />
          </li>
          <li className="flex justify-center">
            <img
              src={channel2}
              alt="img"
              className={`rounded-[20px] w-[${scalSideBar.h + 20}px]`}
            />
          </li>
          <li className="flex justify-center">
            <img
              src={channel3}
              alt="img"
              className={`rounded-[20px] w-[${scalSideBar.h + 20}px]`}
            />
          </li>
          <li className="flex justify-center">
            <img
              src={channel4}
              alt="img"
              className={`rounded-[20px] w-[${scalSideBar.h + 20}px]`}
            />
          </li>
          <li className="flex justify-center">
            <img
              src={addchannel}
              alt="img"
              className={`rounded-[20px] w-[${scalSideBar.h - 6}px]`}
            />
          </li>
          <li className="flex justify-center">
            <img
              src={explore}
              alt="img"
              className={`rounded-[20px] w-[${scalSideBar.h - 6}px]`}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
