import CornerLinedCard from '../../CornerLinedCard/CornerLinedCard';
import Vector from '/vector.svg';
import Lock from '/lock.svg';
import PointsChart from '../PointsChart/PointsChart';
import NewScoreCard from '../NewScoreCard/NewScoreCard';
import PoinstSectionViewController from './PointsSectionViewController';

function PointSection() {
  const { ref, refd, width, achievement_size } = PoinstSectionViewController();

  return (
    <>
      <div className="relative  grid grid-cols-2 ">
        <div
          ref={ref}
          className="flex flex-col items-start justify-end mb-[20px]"
        >
          <p
            className={`font-Rowdies flex justify-center items-center text-[${
              width * (24 / 100)
            }px] font-extrabold`}
          >
            641<span className={`font-Rowdies text-[${20}px]`}> pts</span>
          </p>
          <CornerLinedCard
            childComp={<NewScoreCard />}
            fill="[color:#6B26FF]"
            cornerredius="0.5"
            stroke="[color:#7C3FFF]"
            strokesize={0}
            cornershape={[4, 0, 4, 0]}
            width={width * (60 / 100)}
            height={18}
            margine="mr-[20px]"
          />
          <div className="flex break-keep">
            <p
              className={`"flex justify-center items-center font-sans text-[${
                width * (6 / 100)
              }px] text-[#4A525E] mt-[13px]"`}
            >
              {' '}
              Your personal best{' '}
              <span
                className={`"font-sans font-extrabold text-[${
                  width * (8 / 100)
                }px] text-[#61686F]"`}
              >
                622pts
              </span>
            </p>
          </div>
        </div>

        <div>
          <PointsChart />
        </div>
      </div>
      <div className="border-b-[1px] border-[rgba(217,217,217,36%)] mt-[-16px] mb-[16px]">
        {' '}
      </div>
      <div ref={refd} className="grid grid-cols-5 w-[70%]">
        <CornerLinedCard
          childComp={
            <div
              className={`center w-[${achievement_size}px] h-[${achievement_size}px]`}
            >
              <img className="center " src={Vector} alt="" />
              <img className="center " src={Lock} alt="" />
            </div>
          }
          fill="[color:#202127]"
          cornerredius="0"
          stroke="[color:#202127]"
          strokesize={4}
          cornershape={[4, 4, 4, 4]}
          width={achievement_size - 4}
          height={achievement_size - 4}
        />
        <CornerLinedCard
          childComp={
            <div
              className={`center w-[${achievement_size}px] h-[${achievement_size}px]`}
            >
              <img className="center " src={Vector} alt="" />
              <img className="center " src={Lock} alt="" />
            </div>
          }
          fill="[color:#202127]"
          cornerredius="0"
          stroke="[color:#202127]"
          strokesize={4}
          cornershape={[4, 4, 4, 4]}
          width={achievement_size - 4}
          height={achievement_size - 4}
        />
        <CornerLinedCard
          childComp={
            <div
              className={`center w-[${achievement_size}px] h-[${achievement_size}px]`}
            >
              <img className="center " src={Vector} alt="" />
              <img className="center " src={Lock} alt="" />
            </div>
          }
          fill="[color:#202127]"
          cornerredius="0"
          stroke="[color:#202127]"
          strokesize={4}
          cornershape={[4, 4, 4, 4]}
          width={achievement_size - 4}
          height={achievement_size - 4}
        />
        <CornerLinedCard
          childComp={
            <div
              className={`center w-[${achievement_size}px] h-[${achievement_size}px]`}
            >
              <img className="center " src={Vector} alt="" />
              <img className="center " src={Lock} alt="" />
            </div>
          }
          fill="[color:#202127]"
          cornerredius="0"
          stroke="[color:#202127]"
          strokesize={4}
          cornershape={[4, 4, 4, 4]}
          width={achievement_size - 4}
          height={achievement_size - 4}
        />
        <div
          className={`flex items-center w-[${achievement_size}px] h-[${achievement_size}px]`}
        >
          <h3>+12</h3>
        </div>
      </div>
    </>
  );
}

export default PointSection;
