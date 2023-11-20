

//the card will take from 9 to 12.
//from 5 to 8
//from 1 to 4 

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
const Settings = ()=>{
    return (
        <>
            <h1 className="font-sans font-bold text-white mb-[28px]">Personal Info</h1>
            <div className="grid grid-rows-4 grid-cols-3 grid-flow-col ">
                <input className="col-start-1 col-end-2" type="text" placeholder="username"/>
                <input className="row-start-3 col-start-1 col-end-2" placeholder="location"/>
                <input className="row-start-2 col-start-1 col-end-2 lg:row-start-1 lg:col-start-2 lg:col-end-3 " placeholder="Display Name"/>
                <input className="row-start-3 col-start-2 col-end-3" placeholder="birthday"/>
                <input className="row-start-4 col-start-1 col-end-2 lg:col-start-1 lg:col-end-3" placeholder="Bio"/>
                <input id="email" className=" lg:row-start-2 lg:col-start-1 lg:col-end-3 " placeholder="Email"/>
                <div className="col-start-3  row-span-3  bg-[white] w-[100%] h-[10rem]"></div>
                {/* <input/>
                <input/> */}
            </div>
        </>
    )
}
export default Settings