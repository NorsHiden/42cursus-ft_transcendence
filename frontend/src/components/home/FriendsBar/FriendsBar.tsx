// import ButtonAct from "./ButtonAct"
import FriendsBarViewController from './FriendsBarViewConroller';
import CornerLinedCard from '../../CornerLinedCard/CornerLinedCard';

function FriendsBar() {
  const { ref_sidebar, scalSideBar } = FriendsBarViewController();

  return (
    <aside
      id="default-sidebar"
      ref={ref_sidebar}
      className="fixed top-0 right-0 z-40 w-[10vw] h-[60vh] transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div id="friends-header-side-bar" className="pt-[4vh]">
        <div className="flex flex-col w-full justify-center items-center">
          <h2 className="font-sans extra-bold  text-[1.4vw]">FRIENDS</h2>
          <CornerLinedCard
            childComp={
              <h2
                style={{ color: 'black' }}
                className="center font-sans text-[1vw] font-extrabold "
              >
                {' '}
                online{' '}
              </h2>
            }
            fill="[color:#D5FF5C]"
            cornerredius="0"
            stroke="[color:#E0FF85]"
            cornershape={[
              scalSideBar.card.cornershape,
              0,
              scalSideBar.card.cornershape,
              0,
            ]}
            strokesize={0}
            width={scalSideBar.card.w}
            height={scalSideBar.card.h}
            margine=""
          />
        </div>
      </div>
      <div className="relative w-full h-full pt-[10vh]">
        <ul
          className={`relative w-full h-full space-y-[${scalSideBar.buttomMargine}px]`}
        >
          <li className="realatve w-full flex justify-center">
            <div
              id="avatar"
              className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}
            >
              <div
                id="online-icon"
                className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}
              ></div>
            </div>
          </li>
          <li className="flex justify-center">
            <div
              id="avatar"
              className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}
            >
              <div
                id="online-icon"
                className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}
              ></div>
            </div>
          </li>
          <li className="flex justify-center">
            <div
              id="avatar"
              className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}
            >
              <div
                id="online-icon"
                className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}
              ></div>
            </div>
          </li>
          <li className="flex justify-center">
            <div
              id="avatar"
              className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}
            >
              <div
                id="online-icon"
                className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}
              ></div>
            </div>
          </li>
          <li className="flex justify-center">
            <div
              id="avatar"
              className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}
            >
              <div
                id="online-icon"
                className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}
              ></div>
            </div>
          </li>
          <li className="flex justify-center">
            <div
              id="avatar"
              className={`relative flex bannerimg justify-end h-[${scalSideBar.h}px] w-[${scalSideBar.h}px]  rounded-full `}
            >
              <div
                id="online-icon"
                className={`h-[${scalSideBar.online}px] w-[${scalSideBar.online}px] bg-[#D5FF5C] border-[2px] border-[#1B191D] rounded-full mr-[4px]`}
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default FriendsBar;
