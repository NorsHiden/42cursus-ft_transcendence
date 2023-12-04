import React from 'react';

import logo from '/logo.svg';
import ProviderIcons from '@components/login/ProviderIcons.tsx';

const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-2 w-full h-screen bg-black">
      <div className="relative w-full h-full col-span-2 xl:col-span-1">
        <div id="logo" className="absolute w-full center mt-20">
          <img src={logo} alt="logo" className="w-1/5" />
        </div>
        <div className="w-full h-full center flex-col">
          <h1 className="font-semibold text-2xl md:text-4xl text-white">Are you ready to play!</h1>
          <h2 className="text-2xl font-medium text-gray mt-4">Login</h2>
          <ProviderIcons className="flex mt-10 gap-3 lg:gap-10" />
        </div>
      </div>
      <div className="w-full h-full hidden xl:block bg-primary"></div>
    </div>
  );
};

export default Login;
