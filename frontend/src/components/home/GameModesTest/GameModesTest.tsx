// import ButtonAct from "./ButtonAct";
import Regular from "/regular.svg";
import Cursed from "/cursed.svg";
import Vanish from "/vanish.svg";
import Goldrush from "/goldrush.svg";
import CornerLinedCardTest from "../../CornerLinedCard/CornerLinedCardTest";
import PointSection from "../PoinstSection/PointsSection";
import useMeasure from "react-use-measure";
import CornerLinedCard from "../../CornerLinedCard/CornerLinedCard"



function GameModesTest() {
    
    const [ref, bound] = useMeasure();
    const [first_section, bounds] = useMeasure();

    const width = bound.width;
    const play_size = width * (32 / 100)
    const font_size = play_size * (18 / 100);
    const section_gap_xl = bounds.width * (32 / 100);
    const section_gap = bounds.width * (10 / 100);
    const mb = bound.height * (13.06 / 100);
    const play_button_margin3 = bound.height * (7.95 / 100)
    return (
        <div id="games-and-points" ref={first_section} className={`grid grid-cols-2 ml-[9vw]  mr-[9vw] gap-[${section_gap}px] xl:gap-[${section_gap_xl}px] mt-[5.64vh]`}>

            <section ref={ref} id="game-mode-section" className="">
                <h1 className={`font-extrabold text-[${width * (4 / 100)}px] mb-[${mb}px] font-sans`}> Game Modes </h1>
                <div id="modes" className="grid grid-cols-4 gap-[10px]">
                    
                    <CornerLinedCardTest childComp={
                        
                            <img className="center w-[46%]" src={Regular} alt="" />
                        
                    } fill="[color:#301D13]" cornerredius="3" stroke="[color:#4E301F]" strokesize={0} cornershape={[24,0,24,0]} width={139} height={112} margine="mr-[10px]"  ratio={80/100}/>

                    <CornerLinedCardTest childComp={
                        <img className="center w-[46%]" src={Cursed} alt="" />
                    } fill="[color:#041F1E]" cornerredius="3" stroke="[color:#073736]" strokesize={0} width={139} height={112} cornershape={[24,0,24,0]} margine="mr-[10px]"  ratio={80/100}/>

                    <CornerLinedCardTest childComp={
                        <img className="center w-[46%]" src={Vanish} alt="" />
                    } fill="[color:#1D1333]" cornerredius="3" stroke="[color:#332158]" cornershape={[24,0,24,0]} strokesize={0} width={139} height={112} margine="mr-[10px]"  ratio={80/100}/>

                    <CornerLinedCardTest childComp={
                        <img className="center w-[46%]" src={Goldrush} alt="" />
                    } fill="[color:#241D0C]" cornerredius="3" stroke="[color:#413415]"  cornershape={[24,0,24,0]} strokesize={0} width={139} height={112} margine="mr-[10px]" ratio={80/100}/>
         
                </div>
                <div id="play-card" className={`w-[${play_size}px]`}>
                    <CornerLinedCardTest childComp={
                        <h2 className={`play font-Rowdies text-[${font_size}px]`}> PLAY </h2>
                    } fill="[color:#FE5821]" cornerredius="3" stroke="[color:#FE5821]"  cornershape={[24,0,24,0]} strokesize={0} width={200} height={87} margine={`mt-[${play_button_margin3}px]`} ratio={43/100} />
                </div>
            </section>
            <section style={{'borderColor':"black"}} id="points-section" className="mr-[30px] grid grid-cols-1  mt-[30px] mb-[50px]">
                <PointSection/>
            </section>
        </div>
    )
}

export default GameModesTest;