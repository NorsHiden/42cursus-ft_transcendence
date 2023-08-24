import Avatar from '@mui/material/Avatar';
import CURSED from '/cursedicon.svg';
import CornerLinedCard from '../../CornerLinedCard/CornerLinedCard';
import { twMerge } from 'tailwind-merge';
import CornerLinedCardTest from '../../CornerLinedCard/CornerLinedCardTest';
import useMeasure from 'react-use-measure';
// import CardTesting from "../../CornerLinedCard/CardTesting"

interface ParentCompProps {
  class?: string;
}

interface margin_and_size {
  card_header: {
    marging: number[];
    mode: number;
    mode_imag: number;
    mode_image_margin: number[];
    icone: number;
    mode_name: number;
    card_time: {
      border: number[];
      h: number;
      time: number;
      time_counter: number;
      time_counter_margin: string;
    };
  };

  card_body: {
    avatars: {
      mr: number;
      w: number;
      h: number;
    };
    scor_size: number;
    score_dots: {
      ml: number;
      mr: number;
    };
  };
  foter: {
    h: number;
    w: number;
  };
}

function MatchCard(props: ParentCompProps) {
  const [card_ref, data] = useMeasure();

  const scale: margin_and_size = {
    card_header: {
      marging: [
        data.height * (12 / 100),
        data.width * (9.5 / 100),
        data.width * (8.2 / 100),
      ],
      mode: data.width * (2.8 / 100),
      mode_imag: data.width * (7.25 / 100),
      icone: (data.width * (7.25 / 100)) / 2,
      mode_name: data.width * (4.14 / 100),
      mode_image_margin: [data.height * (17.4 / 100), data.width * (9.5 / 100)],
      card_time: {
        border: [data.height * (1.8 / 100)],
        h: data.height * (13.2 / 100),
        time: data.height * (1.8 / 100) * (28 / 100),
        time_counter: data.height * (5 / 100),
        time_counter_margin: '',
      },
    },
    card_body: {
      avatars: {
        mr: data.height * (21 / 100),
        w: data.width * (14.5 / 100),
        h: data.width * (14.5 / 100),
      },
      scor_size: data.width * (9.32 / 100),
      score_dots: {
        ml: data.width * (3.1 / 100),
        mr: data.width * (3.1 / 100),
      },
    },
    foter: {
      w: data.width * (16 / 100),
      h: 18,
    },
  };

  return (
    <CornerLinedCardTest
      childComp={
        <div
          ref={card_ref}
          className={twMerge('center w-[100%] h-[100%]', props.class)}
        >
          <div
            id="card-header"
            className={`relative flex justify-between mt-[${scale.card_header.marging[0]}px] ml-[${scale.card_header.marging[1]}px] mr-[${scale.card_header.marging[2]}px]`}
          >
            <div id="card-mode" className="flex">
              <div
                className={`relative  l:mr-[12px] xl:mr-[12px] md:mr-[6px] mr-[3px] mb-[${scale.card_header.mode_image_margin[0]}px] rounded-full bg-[#3DFFFB] w-[${scale.card_header.mode_imag}px] h-[${scale.card_header.mode_imag}px]`}
              >
                <img
                  src={CURSED}
                  className={`center w-[${scale.card_header.icone}px] h-[${scale.card_header.icone}px]`}
                />
              </div>
              <div className="flex flex-col">
                <p
                  style={{ color: '#5F5E61' }}
                  id="mode-titel"
                  className={`font-sans text-[${scale.card_header.mode}px] font-extrabold`}
                >
                  MODE
                </p>
                <p
                  style={{ color: 'white' }}
                  id="mode-name"
                  className={`font-sans text-[${scale.card_header.mode_name}px] font-extrabold`}
                >
                  CURSED
                </p>
              </div>
            </div>
            {/* <div id="card-time" className="border-l-[2px] border-[orange]">
                    </div> */}
            <div
              id="card-time"
              className={`border-l-[${scale.card_header.card_time.border[0]}px] border-[#FE5821] h-[${scale.card_header.card_time.h}px]`}
            >
              <div id="time-counter" className={`ml-[4px]`}>
                <p
                  id="title"
                  style={{ color: '#5F5E61' }}
                  className={`font-sans text-[${scale.card_header.card_time.time}px] md:text-[6px] font-extrabold`}
                >
                  TIME
                </p>
                <p
                  style={{ color: 'white' }}
                  className={`font-sans text-[${scale.card_header.card_time.time_counter}px] font-extrabold `}
                >
                  04:23
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center w-[100%]">
            <div className={`mr-[${scale.card_body.avatars.mr}px]`}>
              <Avatar
                alt="Remy Sharp"
                src="./public/aamoussa.jpeg"
                sx={{
                  width: scale.card_body.avatars.h,
                  height: scale.card_body.avatars.w,
                }}
              />
            </div>
            <div className="flex justify-between">
              <p
                style={{ color: 'white' }}
                className={`font-Rowdies text-[${scale.card_body.scor_size}px] font-extrabold`}
              >
                2
              </p>
              <p
                style={{ color: 'white' }}
                className={`font-Rowdies  text-[${scale.card_body.scor_size}px] font-extrabold ml-[${scale.card_body.score_dots.ml}px] mr-[${scale.card_body.score_dots.mr}px]`}
              >
                :
              </p>
              <p
                style={{ color: 'white' }}
                className={`font-Rowdies text-[${scale.card_body.scor_size}px] font-extrabold`}
              >
                5
              </p>
            </div>
            <div className={`ml-[${scale.card_body.avatars.mr}px]`}>
              <Avatar
                alt="Remy Sharp"
                src="./public/aamoussa.jpeg"
                sx={{
                  width: scale.card_body.avatars.h,
                  height: scale.card_body.avatars.w,
                }}
              />
            </div>
          </div>
          <div className="relative flex justify-center w-[100%]">
            <div id="play-card" className={`w-[${scale.foter.w}px] `}>
              <CornerLinedCardTest
                childComp={
                  <h2
                    style={{ color: 'black' }}
                    className={`center font-Rowdies text-[${
                      scale.foter.w * (19 / 100)
                    }px] font-extrabold `}
                  >
                    {' '}
                    Live{' '}
                  </h2>
                }
                fill="[color:#D5FF5C]]"
                cornerredius="1"
                stroke="[color:#E0FF85]"
                cornershape={[24, 0, 24, 0]}
                strokesize={0}
                width={200}
                height={87}
                ratio={43 / 100}
              />
            </div>
          </div>
        </div>
      }
      fill="[color:#1E1F23]"
      cornerredius="3"
      stroke="[color:#2C2D33]"
      strokesize={0}
      width={386}
      height={212}
      cornershape={[48, 0, 48, 0]}
      margine=""
      ratio={55 / 100}
    />
  );
}

export default MatchCard;
