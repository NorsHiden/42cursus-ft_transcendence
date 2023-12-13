import { NavLink } from 'react-router-dom';
import Card from '@components/Card';
import { useSelectedChannel } from '@context/Channel';

export const NavButtons = () => {
  const { setChannels, setDms } = useSelectedChannel();

  return (
    <>
      <div className="grid grid-flow-col  gap-4 lg:gap-2 2xl:gap-4 w-full">
        <NavLink
          to="channels"
          className="justify-self-end "
          onClick={() => {
            setDms([]);
          }}
        >
          {({ isActive }) => (
            <Card
              className={` center ${
                isActive ? 'text-primary' : 'text-transparent'
              } w-[148px] h-[35px] lg:w-[74px] lg:h-[17px] 2xl:w-[148px] 2xl:h-[35px] cursor-pointer `}
              cut={40}
              borderRadius={30}
              {...(isActive ? { borderColor: '#FF8C66', borderWidth: 2 } : {})}
            >
              <p className="font-poppins font-medium uppercase text-white lg:text-xs 2xl:text-base">
                CHANNELS
              </p>
            </Card>
          )}
        </NavLink>
        <NavLink
          to="messages"
          className="justify-self-start"
          onClick={() => {
            setChannels([]);
          }}
        >
          {({ isActive }) => (
            <Card
              className={`center ${
                isActive ? 'text-primary' : 'text-transparent'
              } w-[148px] h-[35px] lg:w-[74px] lg:h-[17px] 2xl:w-[148px] 2xl:h-[35px] cursor-pointer`}
              cut={40}
              borderRadius={30}
              {...(isActive ? { borderColor: '#FF8C66', borderWidth: 2 } : {})}
            >
              <p className="font-poppins font-medium uppercase text-white lg:text-xs 2xl:text-base">
                MESSAGES
              </p>
            </Card>
          )}
        </NavLink>
      </div>
      {/* {
      isActive? <ChannelsList />:<MessagesList/>
    } */}
    </>
  );
};

export default NavButtons;
