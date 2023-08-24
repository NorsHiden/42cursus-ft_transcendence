import google from "/google.svg"
import ft from "/42.svg"
import discord from "/discord.svg"
import logo from "/logo.svg"

const LoginView = () => {
  return (
    <div className="grid grid-cols-2 h-[100vh] w-[100wh]">
        <div id="login_section" className="w-full h-full">
            <div id="logo" className="flex justify-center mt-[7.59vh]">
                <img src={logo} alt="logo" className=" w-[13.58vw]"/>
            </div>
            <div id="providers_section" className="flex flex-col mt-[18.14vh] items-center w-full h-full">
                <h1 className="font-sans font-extrabold text-[2.29vw] ">Are you ready to play!</h1>
                <h2 className="text-[1.66vw] font-sans font-extrabold text-[#5E6069] mt-[1.57vh]" >login</h2>
                <div id="providers" className="flex mt-[3.51vh]">
                    <img src={google} alt="google" className="w-[5vw] w-[5vw] mr-[2.18vw]"/>
                    <img src={discord} alt="discord" className="w-[5vw] w-[5vw] mr-[2.18vw]" />
                    <img src={ft} alt="fortytwo" className="w-[5vw] w-[5vw]"/>
                </div>
            </div>
        </div>
        <div id="loginIlustration" className="w-full h-full bg-[#FE5821]">
        
        </div>
    </div>
  );
};

export default LoginView;