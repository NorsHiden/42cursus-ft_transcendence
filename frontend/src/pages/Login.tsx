import logo from '/logo.svg';
import ProviderIcons from '@components/login/ProviderIcons.tsx';






function Login() {
  return (
    <div className="grid grid-cols-2 h-screen w-[100wh] bg-background">
      <div id="login_section" className="relative w-full 1h-full">
        <div id="logo" className="absolute w-full flex justify-center items-center mt-[64px]">
          <img src={logo} alt="logo" className=" w-[13.58vw]" />
        </div>
        <div
          id="providers_section"
          className="flex flex-col justify-center items-center w-full h-full"
        >
          <h1 className="font-sans font-extrabold text-[12px] sm:text-[22px] lg:text-[44px] text-white">
            Are you ready to play!
          </h1>
          <h2 className="text-[1.66vw] font-sans font-extrabold text-[#5E6069] mt-[17px]">
            Login
          </h2>
          <ProviderIcons className='flex mt-[38px] gap-[12px]  lg:gap-[42px]'/>
        </div>
      </div>
      <div id="loginIlustration" className="w-full h-full bg-[#FE5821]"></div>
    </div>
  );
}

export default Login;
