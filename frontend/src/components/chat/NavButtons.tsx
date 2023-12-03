import React from 'react';
import Card from '@components/Card';

export const NavButtons = () => {
    return (
      <div className='grid grid-flow-col 2xl:gap-4 w-full'>
        <Card className="justify-self-end center text-primary lg:w-[74px] lg:h-[17px] 2xl:w-[148px] 2xl:h-[35px] cursor-pointer" cut={40} borderRadius={30} borderWidth={2} borderColor='#FF8C66'>
          <p className="font-poppins font-medium uppercase text-white lg:text-xs 2xl:text-base">CHANNELS</p>
        </Card>
        <Card className="center text-transparent lg:w-[74px] lg:h-[17px] 2xl:w-[148px] 2xl:h-[35px] cursor-pointer" cut={40} borderRadius={30} borderWidth={2} borderColor='#FF8C66'>
          <p className="font-poppins font-medium uppercase text-white lg:text-[6px] 2xl:text-[13px]">DIRECT MESSAGES</p>
        </Card>
      </div>
    );
  };

export default NavButtons;