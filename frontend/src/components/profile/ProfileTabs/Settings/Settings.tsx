import React, { FC,useState, useRef, useEffect } from "react"
// import React, { useState, useRef, useEffect } from 'react';

//the card will take from 9 to 12.
//from 5 to 8
//from 1 to 4 

import InputField from "../../../Reusablecomponent/InputField"
import TextErea from "./TextErea"
import Card from "../../../Card"
// import avatar from "../../../../assets/images/avatar.png"
// import banner from "../../../../assets/images/banner.png"
// import { name, username } from "../../../../data.json"
// const Settings = ()=>{
//     return (
//         <>
//             <h1 className="font-sans font-bold text-white mb-[28px]">Personal Info</h1>
//             <div className="grid grid-rows-4 grid-cols-12 grid-flow-col gap-4">
//                 <input className="col-start-1 col-end-5" type="text" placeholder="username"/>
//                 <input className="row-start-3 col-start-1 col-end-5" placeholder="location"/>
//                 <input className="col-start-5 col-end-9 " placeholder="Display Name"/>
//                 <input className="row-start-3 col-start-5 col-end-9" placeholder="birthday"/>
//                 <input className="row-start-4 col-start-1 col-end-9" placeholder="Bio"/>
//                 <input id="email" className="row-start-2 col-start-1 col-end-9 " placeholder="Email"/>
//                 <div className="col-start-9 col-end-13 row-span-3  bg-[white] w-[100%] h-[10rem]"></div>
//                 {/* <input/>
//                 <input/> */}
//             </div>
//         </>
//     )
// }


const Settings:FC = ()=>{
    const [Bio, setBio] = useState<string>("")
    
    return (
        <>
            <h1 className="font-sans font-bold text-white mb-[28px]">Personal Info</h1>
            <div className="grid grid-rows-6 lg:grid-rows-4 grid-cols-3 grid-flow-col gap-4 h-[26rem] lg:h-[20rem] ">
                <InputField 
                    className="col-start-1 col-end-2 h-10 sm:h-12 md:h-14 "
                    placeholder="username" 
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    value="aamoussa"
                    />
                <InputField 
                    className="row-start-5 col-start-1 col-end-2 lg:row-start-3 lg:col-start-1 lg:col-end-2 h-10 sm:h-12 md:h-14"
                    placeholder="location" 
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    />            
                <InputField
                    id="display-name" 
                    className="row-start-2 col-start-1 col-end-2 lg:row-start-1 lg:col-start-2 lg:col-end-3 h-10 sm:h-12 md:h-14"
                    placeholder="Display Name" 
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    />
                 <InputField
                    id="birthday" 
                    className="row-start-4 col-start-1 col-end-2 lg:row-start-3 lg:col-start-2 lg:col-end-3 h-10 sm:h-12 md:h-14"
                    placeholder="birthdate" 
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    />
                
                <TextErea
                    setContent={setBio}
                    textContent={Bio}
                />

                <InputField
                    id="email" 
                    className="row-start-3 col-start-1 col-end-2 lg:row-start-2 lg:col-start-1 lg:col-end-3 filter opacity-50 h-10 sm:h-12 md:h-14"
                    placeholder="Email"
                    value="amoussaouianas@gmail.com"
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    disabled
                    />
               
                
                {/* <div className="lg:col-start-3 lg:row-span-3  bg-[white]  "></div> */}
                <Card className="lg:col-start-3 lg:row-span-3  text-[#1E1F23]" cut={9} borderColor="#5E6069" borderWidth={0.2} borderRadius={20}>
                    <div id="card-header" className="w-[100%] h-[40%] bg-cover bg-center">
                        <img src={""} alt="" className="w-full h-full" />
                        <div className="relative h-24 w-24 rounded-full border-[6px] border-[#1E1F23] ml-4 -mt-16">
                            <img
                                src={""}
                                alt=""
                                className="w-full h-full rounded-full mx-auto"
                            />
                        </div>
                    </div>
                    <div id="card-body">
                        <h1 className="font-sans font-bold text-4xl text-white ml-4 mt-8">aamoussa</h1>
                        <p className="font-sans font-bold text-sm text-[#5E6069] ml-4 opacity-50 -mt-4">
                            @Anas
                        </p>
                    </div>
                </Card>
                <div id="buttrons" className="flex justify-end col-start-3 row-start-4 w-full">
                    <Card className="flex justify-center items-center text-transparent hover:text-[#FE5821] font-bold rounded-lg px-4 py-2 mr-2 w-[98px] h-[34px]" cut={9}>
                        <button className="text-white font-bold ">Reset</button>
                    </Card>
                    <Card className="flex justify-center items-center text-transparent hover:text-[#FE5821] font-bold rounded-lg px-4 py-2 mr-2 w-[98px] h-[34px]" cut={9}>
                        <button className="text-white font-bold ">Save</button>
                    </Card>
                    {/* <button className="bg-[#60A5FA] text-white font-bold rounded-lg px-4 py-2 w-[98px] h-[34px]">Save</button> */}
                </div>
            </div>
        </>
    )
}
export default Settings