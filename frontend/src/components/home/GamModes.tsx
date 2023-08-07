import ButtonAct from "./ButtonAct";
import Regular from "../../../public/regular.svg";
import Cursed from "../../../public/cursed.svg";
import Vanish from "../../../public/vanish.svg";
import Goldrush from "../../../public/goldrush.svg";
import CornerLinedCard from "../CornerLinedCard";


function GameModes() {
    return (
        <div id="games-and-points" className="flex justify-between mt-[35px] ml-[169px]">
            
            
            <section id="game-mode-section" className="">
                <h1  className="game-mode-font mb-[46px] font-sans">Game Modes
                </h1>
                <div id="modes" className="flex">
                    <CornerLinedCard childComp={
                        <img className="center" src={Regular} alt="" />
                    } fill="[color:#301D13]" stroke="[color:#4E301F]" strokesize={1}  width={113} height={88} margine="mr-[20px]"  polygonpoints="14.42% -0.15%, 100% 0%, 100.23% 80.16%, 87.12% 100.88%, 0% 100%, -0.5% 20.08%" />
                   
                   <CornerLinedCard childComp={
                        <img className="center" src={Cursed} alt="" />
                    } fill="[color:#041F1E]" stroke="[color:#073736]" strokesize={1}  width={113} height={88} margine="mr-[20px]"  polygonpoints="14.42% -0.15%, 100% 0%, 100.23% 80.16%, 87.12% 100.88%, 0% 100%, -0.5% 20.08%" />

                    <CornerLinedCard childComp={
                        <img className="center" src={Vanish} alt="" />
                    } fill="[color:#1D1333]" stroke="[color:#332158]" strokesize={1}  width={113} height={88} margine="mr-[20px]"  polygonpoints="14.42% -0.15%, 100% 0%, 100.23% 80.16%, 87.12% 100.88%, 0% 100%, -0.5% 20.08%" />

                    <CornerLinedCard childComp={
                        <img className="center" src={Goldrush} alt="" />
                    } fill="[color:#241D0C]" stroke="[color:#413415]" strokesize={1} width={113} height={88} margine="mr-[20px]" polygonpoints="14.42% -0.15%, 100% 0%, 100.23% 80.16%, 87.12% 100.88%, 0% 100%, -0.5% 20.08%" />

                </div>
                <ButtonAct margin="mt-[28px] ml-[1px]"/>
                </section>
                <section id="points-section"  className="mr-[30px]">
                    hello im points section
                </section>
        </div>
    )
}

export default GameModes;