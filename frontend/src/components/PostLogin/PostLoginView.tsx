import { useState } from 'react';
import logo from '/logo.svg';
import aamoussa from '/aamoussa.jpeg';
import update from '/update.svg';
import CornerLinedCardTest from '../CornerLinedCard/CornerLinedCardTest';
import PostLoginViewController from './PostLoginViewController';

const PostLoginView = () => {

  const {
    handleInput,
    handlesubmit,
    trigerupload,
    trigersubmit,
    handleUpload,
    FormData,
    errors,
    UserExist
  } = PostLoginViewController();

  return (
    <div className="grid grid-cols-2 h-[100vh] w-[100wh]">
      <div id="login_section" className="w-full h-full overflow-hidden">
        <div id="logo" className="flex justify-center mt-[7.59vh]">
          <img src={logo} alt="logo" className=" w-[13.58vw]" />
        </div>
        <div
          id="providers_section"
          className="flex flex-col mt-[18.14vh] items-center w-full h-full"
        >
          <div
            id="file1"
            className="relative rounded-full h-[14.16vh] w-[14.16vh] cursor-pointer"
            onClick={trigerupload}
          >
            <img
              src={FormData.avatar ? FormData.avatar : ""}
              alt="img"
              id="file1"
              className="absolute rounded-full h-[14.16vh] w-[14.16vh] "
            />
            <div className="flex justify-end h-full w-full z-15 mt-[6px] ">
              <img
                id="file1"
                src={update}
                alt=""
                className="absolute h-[3.33vh] w-[3.33vh] z-15"
              />
            </div>
          </div>
          <input
            type="file"
            id="file1"
            name="file1"
            className="hidden"
            onChange={handleUpload}
          />
          <div id="inputs" className="flex mt-[3.42vh]">
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col">
                  <p className={` ${errors.name?"block":"hidden"} ml-1 text-[1.48vh]  text-[orange]`}>PLEASE ENTER A USER NAME</p>
                  <p className={` ${UserExist?"block":"hidden"} ml-1 text-[1.48vh]  text-[orange]`}>USER NAME ALREADY EXIST</p>
                <div className=" h-[5.92vh] w-[14.57vw] rounded-[1.29vh] bg-[#1E1F23] border-[1px]  text-[1.48vh] border-[#3E4048]">
                  <input
                    className=" ml-[1.14vw] h-full w-[90%] bg-[#1E1F23] mb-2 text-[1.48vh] focus:outline-none"
                    name="name"
                    type="text"
                    value={FormData.name?FormData.name:""}
                    onChange={handleInput}
                    placeholder="User Name"
                  />
                </div>
                <div className="mt-[1.29vh] h-[5.92vh] w-[14.57vw] rounded-[1.29vh] bg-[#1E1F23] border-[1px] text-[1.48vh] border-[#3E4048]">
                  <input
                    className="ml-[1.14vw] h-full w-[90%] bg-[#1E1F23] rounded-[14px] focus:outline-none text-[1.48vh]"
                    name="displayname"
                    type="text"
                    value={FormData.displayname?FormData.displayname:""}
                    onChange={handleInput}
                    placeholder="Display Name"
                  />
                  <p className={`${errors.displayname?"block":"hidden"} text-[orange] mt-1`}>PLEASE ENTER A DISPLAY NAME</p>
                </div>
                <div className="w-full flex justify-center mt-[3.24vh]">
                  <div
                    className="w-[8.12vw] h-[6.29vh] cursor-pointer"
                    onClick={trigersubmit}
                  >
                    <CornerLinedCardTest
                      childComp={
                        <h2 className={`play font-Rowdies text-[2.59vh]`}>
                          {' '}
                          SAVE{' '}
                        </h2>
                      }
                      fill="[color:#FE5821]"
                      cornerredius="2"
                      stroke="[color:#FE5821]"
                      cornershape={[24, 0, 24, 0]}
                      strokesize={0}
                      width={200}
                      height={87}
                      margine=""
                      ratio={43 / 100}
                    />
                  </div>
                  <input
                    type="submit"
                    value="submit"
                    name="submit"
                    className="hidden"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="loginIlustration" className="w-full h-full bg-[#FE5821]"></div>
    </div>
  );
};

export default PostLoginView;
