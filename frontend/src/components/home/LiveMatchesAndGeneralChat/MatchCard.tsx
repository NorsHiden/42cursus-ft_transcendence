import Avatar from '@mui/material/Avatar';
import CURSED from "../../../../public/Cursedicon.svg"
import CornerLinedCard from "../../CornerLinedCard/CornerLinedCard"
import {twMerge} from "tailwind-merge";
// import CardTesting from "../../CornerLinedCard/CardTesting"


interface ParentCompProps {
    class?:string
}

function MatchCard(props:ParentCompProps){
    return (
        <CardTesting childComp={
            <div className={twMerge(
                "center w-[100%] h-[100%]",
                props.class
            )}
            >
                <div id="card-header" className="flex justify-between mt-[26px] ml-[37px] mr-[32px]">
                    <div id="card-mode" className="flex">
                        <div  className="relative  mr-[12px] mt-[3px] mb-[37px] rounded-full bg-[#3DFFFB] w-[28px] h-[28px]">
                            <img  src={CURSED} className="center w-[16px] h-[18px]" />
                        </div>
                        <div className="flex flex-col">
                            <p style={{ color: "#5F5E61" }} id="mode-titel" className="font-sans text-[8px] font-extrabold">MODE</p>
                            <p style={{ color: "white" }} id="mode-name" className="font-sans text-[16px] font-extrabold">CURSED</p>
                        </div>
                    </div>
                    {/* <div id="card-time" className="border-l-[2px] border-[orange]">
                    </div> */}
                    <div id="card-time" className="border-l-[4px] border-[#FE5821] h-[28px]">
                        
                    <div id="time-counter" className="ml-[5px]">
                            <p id="title" style={{ color: "#5F5E61" }} className="font-sans text-[8px] font-extrabold">TIME</p>
                            <p style={{ color: "white" }} className="font-sans text-[16px] font-extrabold mt-[-4px]">04:23</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-[100%]">
                    <div className="mr-[24px]">
                        <Avatar
                            alt="Remy Sharp"
                            src="./public/aamoussa.jpeg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </div>
                    <div className="flex justify-between">
                        <p style={{ color: "white" }} className="font-Rowdies text-[36px] font-extrabold">2</p>
                        <p style={{ color: "white" }} className="font-Rowdies  text-[36px] font-extrabold ml-[18px] mr-[18px]">:</p>
                        <p style={{ color: "white" }} className="font-Rowdies  text-[36px] font-extrabold">5</p>
                    </div>
                    <div className="ml-[24px]">
                        <Avatar
                            alt="Remy Sharp"
                            src="./public/aamoussa.jpeg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <CornerLinedCard childComp={
                        <h2 style={{ color: "black" }} className="center font-sans text-[12px] font-extrabold "> live </h2>
                    } fill="[color:#D5FF5C]" cornerredius="1" stroke="[color:#E0FF85]" cornershape={[7, 0, 7, 0]} strokesize={2} width={62} height={18} margine="" />
                </div>

            </div>
                                    


        } fill="[color:#1E1F23]" cornerredius="3" stroke="[color:#2C2D33]" strokesize={3} width={386} height={212} cornershape={[48, 0, 48, 0]} margine="" />
    )
}

export default MatchCard