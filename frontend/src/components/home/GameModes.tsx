// import ButtonAct from "./ButtonAct";
import Regular from "/regular.svg";
import Cursed from "/cursed.svg";
import Vanish from "/vanish.svg";
import Goldrush from "/goldrush.svg";
import CornerLinedCard from "../CornerLinedCard/CornerLinedCard";
import PointSection from "./PointsSection";



function GameModes() {
    return (
        <div id="games-and-points" className="flex justify-between mt-[35px] ml-[169px] mr-[169px] ">

            <section id="game-mode-section" className="">
                <h1 className="game-mode-font mb-[46px] font-sans">Game Modes
                </h1>
                <div id="modes" className="flex">
                    <CornerLinedCard childComp={
                        <img className="center" src={Regular} alt="" />
                    } fill="[color:#301D13]" cornerredius="3" stroke="[color:#4E301F]" strokesize={0} cornershape={[24,0,24,0]} width={139} height={112} margine="mr-[20px]"  />

                    <CornerLinedCard childComp={
                        <img className="center" src={Cursed} alt="" />
                    } fill="[color:#041F1E]" cornerredius="3" stroke="[color:#073736]" strokesize={0} width={139} height={112} cornershape={[24,0,24,0]} margine="mr-[20px]"  />

                    <CornerLinedCard childComp={
                        <img className="center" src={Vanish} alt="" />
                    } fill="[color:#1D1333]" cornerredius="3" stroke="[color:#332158]" cornershape={[24,0,24,0]} strokesize={0} width={139} height={112} margine="mr-[20px]"  />

                    <CornerLinedCard childComp={
                        <img className="center" src={Goldrush} alt="" />
                    } fill="[color:#241D0C]" cornerredius="3" stroke="[color:#413415]"  cornershape={[24,0,24,0]} strokesize={0} width={139} height={112} margine="mr-[20px]" />
         
         
                </div>
                <CornerLinedCard childComp={
                        <h2 className="play font-Rowdies text-[38px] "> PLAY </h2>
                    } fill="[color:#FE5821]" cornerredius="3" stroke="[color:#FE5821]"  cornershape={[24,0,24,0]} strokesize={0} width={200} height={87} margine="mt-[28px]" />
         
            </section>
            <section style={{'borderColor':"black"}} id="points-section" className="mr-[30px] flex flex-col  mt-[30px] mb-[50px]">
                <PointSection/>
            </section>
        </div>
    )
}

export default GameModes;