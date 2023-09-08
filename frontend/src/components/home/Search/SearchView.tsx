import { RemoveScroll } from 'react-remove-scroll';
import {  useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SearchViewCOntroller
 from './SearchViewController';
function SearchView(){
  const { FormData, inputRef, handleInput, handleClickOutside, hide, inputtranslate} =
    SearchViewCOntroller();

    document.addEventListener('click', handleClickOutside, true);
    const scale = window.innerHeight * (43 / 100)
    const test = "scale-y-[" + scale + "]"
    const reset = "scale-y-[" + 1/scale  + "]"

    console.log(FormData);
    
    if (hide)
    {
        return (<Navigate to="/home"/>)
    }
    return (
      <>
        <RemoveScroll>
          <div
            className={`absolute h-[${window.innerHeight + 150}px] w-[${window.innerWidth}px] bg-[#1B191D]  mt-[-150px] z-50 bg-opacity-90`}
          >
            <div className=" h-full w-full flex justify-center items-center">
              <div  className="">
                <input
                  ref={inputRef}
                    className={`w-[31.23vw] h-[6vh] bg-[#202127]  text-[1.48vh] focus:outline-none outline-none transform ease-in duration-[900ms] rounded-t-[20px] ${inputtranslate && "-translate-y-[25vh]"}`}
                    name="name"
                    type="text"
                    value={FormData}
                    onChange={handleInput}
                    placeholder="Find a Player"
                      />
                  <div className={`origin-center transform ease-in duration-[900ms]  ${inputtranslate && test} w-[31.23vw] h-[1px] bg-[#202127] `}>
                  </div>
                    <div className={` absolute  w-[300px] h-[30px] bg-[#fff] top-0  `} >dasd </div>
              </div>
            </div>
          </div>
        </RemoveScroll>
      </>
    );
}

export default SearchView