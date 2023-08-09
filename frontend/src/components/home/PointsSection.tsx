import CornerLinedCard from "../CornerLinedCard/CornerLinedCard"
import Exclude from "../../../public/Exclude.svg"
import Vector from "../../../public/Vector.svg"
import Lock from "../../../public/lock.svg"
import PointsChart from "./PointsChart"

function PointSection(){
 
    return (
        <>
            <div className="flex ml-[15px]">
                <div>
                    <p className="font-Rowdies text-[48px] font-extrabold">641<span className="font-Rowdies text-[36px]"> pts</span></p>
                    <CornerLinedCard childComp={
                        <div className="center flex justify-center w-[116px] h-[18]">
                            <img className="mr-[4px]" src={Exclude} alt="" />
                            <p style={{color:"white"}} className="font-sans text-[8px]">New personal record</p>
                        </div>
                    } fill="[color:#6B26FF]" cornerredius="0.5" stroke="[color:#7C3FFF]" strokesize={2} cornershape={[4,0,4,0]} width={116} height={18} margine="mr-[20px]"  />

                    <p className="font-sans text-[12px] text-[#4A525E] mt-[13px]"> Your personal best <span className="font-sans text-[12px]  font-extrabold text-[#61686F]">622pts</span></p>
                </div>
                <div className="w-[247px] h-[74px] ">
                    <PointsChart />
                </div>
            </div>
            <div className="border-b-[1px] border-[rgba(217,217,217,36%)] mt-[16px] mb-[16px]"> </div>
            <div className="flex ml-[15px]">
                <CornerLinedCard childComp={
                    <div className="center w-[48px] h-[48px]">
                        <img className="center " src={Vector} alt="" />
                        <img className="center " src={Lock} alt="" />
                    </div>
                }

                    fill="[color:#202127]" cornerredius="0" stroke="[color:#202127]" strokesize={4} cornershape={[4, 4, 4, 4]} width={52} height={52} margine="mr-[20px]" />
                <CornerLinedCard childComp={
                    <div className="center w-[52px] h-[52px]">
                        <img className="center " src={Vector} alt="" />
                        <img className="center " src={Lock} alt="" />
                    </div>
                }

                    fill="[color:#202127]" cornerredius="0" stroke="[color:#202127]" strokesize={4} cornershape={[4, 4, 4, 4]} width={52} height={52} margine="mr-[20px]" />
                <CornerLinedCard childComp={
                    <div className="center w-[48px] h-[48px]">
                        <img className="center " src={Vector} alt="" />
                        <img className="center " src={Lock} alt="" />
                    </div>
                }

                    fill="[color:#202127]" cornerredius="0" stroke="[color:#202127]" strokesize={4} cornershape={[4, 4, 4, 4]} width={52} height={52} margine="mr-[20px]" />
                <CornerLinedCard childComp={
                    <div className="center w-[48px] h-[48px]">
                        <img className="center " src={Vector} alt="" />
                        <img className="center " src={Lock} alt="" />
                    </div>
                }

                    fill="[color:#202127]" cornerredius="0" stroke="[color:#202127]" strokesize={4} cornershape={[4, 4, 4, 4]} width={52} height={52} margine="mr-[20px]" />
                <div className="flex items-center w-[48px] h-[48px]">
                    <h3>+12</h3>
                </div>
            </div>
        </>
    )
}

export default PointSection