// import ButtonAct from "./ButtonAct";
import Regular from '/regular.svg';
import Cursed from '/cursed.svg';
import Vanish from '/vanish.svg';
import Goldrush from '/goldrush.svg';
import CornerLinedCardTest from '../../CornerLinedCard/CornerLinedCardTest';
import PointSection from '../PoinstSection/PointsSection';
import GameModesTestViewCOntroller from './GameModestestViewController';

function GameModesTest() {
  const { ref, scale } = GameModesTestViewCOntroller();

  return (
    <div
      id="games-and-points"
      className={`grid grid-cols-2 ml-[9vw]  mr-[9vw] gap-[20.91vw] mt-[5.64vh]`}
    >
      <section ref={ref} id="game-mode-section" className="">
        <h1
          className={`font-extrabold text-[${scale.width}px] mb-[${scale.mb}px] font-sans`}
        >
          {' '}
          Game Modes{' '}
        </h1>
        <div id="modes" className="grid grid-cols-4 gap-[10px]">
          <CornerLinedCardTest
            childComp={<img className="center w-[46%]" src={Regular} alt="" />}
            fill="[color:#301D13]"
            cornerredius="3"
            stroke="[color:#4E301F]"
            strokesize={0}
            cornershape={[24, 0, 24, 0]}
            width={139}
            height={112}
            margine="mr-[10px]"
            ratio={80 / 100}
          />

          <CornerLinedCardTest
            childComp={<img className="center w-[46%]" src={Cursed} alt="" />}
            fill="[color:#041F1E]"
            cornerredius="3"
            stroke="[color:#073736]"
            strokesize={0}
            width={139}
            height={112}
            cornershape={[24, 0, 24, 0]}
            margine="mr-[10px]"
            ratio={80 / 100}
          />

          <CornerLinedCardTest
            childComp={<img className="center w-[46%]" src={Vanish} alt="" />}
            fill="[color:#1D1333]"
            cornerredius="3"
            stroke="[color:#332158]"
            cornershape={[24, 0, 24, 0]}
            strokesize={0}
            width={139}
            height={112}
            margine="mr-[10px]"
            ratio={80 / 100}
          />

          <CornerLinedCardTest
            childComp={<img className="center w-[46%]" src={Goldrush} alt="" />}
            fill="[color:#241D0C]"
            cornerredius="3"
            stroke="[color:#413415]"
            cornershape={[24, 0, 24, 0]}
            strokesize={0}
            width={139}
            height={112}
            margine="mr-[10px]"
            ratio={80 / 100}
          />
        </div>
        <div id="play-card" className={`w-[${scale.play_size}px]`}>
          <CornerLinedCardTest
            childComp={
              <h2 className={`play font-Rowdies text-[${scale.font_size}px]`}>
                {' '}
                PLAY{' '}
              </h2>
            }
            fill="[color:#FE5821]"
            cornerredius="3"
            stroke="[color:#FE5821]"
            cornershape={[24, 0, 24, 0]}
            strokesize={0}
            width={200}
            height={87}
            margine={`mt-[${scale.play_button_margin3}px]`}
            ratio={43 / 100}
          />
        </div>
      </section>
      <section
        style={{ borderColor: 'black' }}
        id="points-section"
        className=" grid grid-cols-1   "
      >
        <PointSection />
      </section>
    </div>
  );
}

export default GameModesTest;
