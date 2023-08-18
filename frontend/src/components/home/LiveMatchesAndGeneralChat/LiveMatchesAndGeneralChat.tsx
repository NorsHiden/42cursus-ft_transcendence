
// import { blue } from "@mui/material/colors";
import { colors } from "@mui/material"
import CornerLinedCard from "../../CornerLinedCard/CornerLinedCard"
import MatchCard from "./MatchCard"
import { grey } from "@mui/material/colors"
import Subtract from "/subtract.svg"
import aamoussa from "/aamoussa.jpeg"

import useMeasure from "react-use-measure"
import CornerLinedCardTest from "../../CornerLinedCard/CornerLinedCardTest"
import GeneralChat from "../GeneralChat/GeneralChat"




interface live_match_header {
    title:number,
    radio_buttone:{
        size:string,
        text:number,
    },
    select_button:{
        w:number,
    }

}

interface GeneralChat {
    chatsize:number,
    header_size:number,
    channel_name:number,
    channel_online:number,
  }



function LiveMatchesAndGeneralChat() {
    const [header_ref, data] = useMeasure()

    const header:live_match_header = {
        title: data.width * (2.32 / 100),
        radio_buttone:{
            size: String((data.width * (1.68 / 100))) + "px",
            text:(data.width * (1 / 100)),
        },
        select_button: {
            w: data.width * (12.94 / 100),
        }
    }
    // const chat:GeneralChat = {
    //     chatsize : data.width * (32 / 100),
    //     header_size:data.width * (16 / 100),
    //     channel_name:  (data.width * (16 / 100)) * (8 / 100),
    //     channel_online: (data.width * (16 / 100)) * (4 / 100),
    // }

    return (
      <div className="grid grid-cols-3 mt-[35px] ml-[169px]  mr-[169px] gap-4">
        <section id="live-matches" className="col-span-2 flex flex-col  gap-[46px]">
          <div
            ref={header_ref}
            id="liveMatches-header"
            className="flex justify-between items-center"
          >
            <h1
              className={`font-sans text-[${header.title}px] game-mode-font `}
            >
              Recent Matches
            </h1>
            <div className="flex">
              <div className="flex items-center ml-[30px]">
                <input
                  style={{ "--data": header.radio_buttone.size }}
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className=""
                />
                <label
                  htmlFor="default-radio-1"
                  className={`ml-2 text-[${header.radio_buttone.text}px] font-medium text-gray-900 `}
                >
                  ALL
                </label>
              </div>
              <div className="flex items-center ml-[30px]">
                <input
                  checked
                  style={{ "--data": header.radio_buttone.size }}
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 "
                />
                <label
                  htmlFor="default-radio-2"
                  className={`ml-2 text-[${header.radio_buttone.text}px] font-medium text-gray-900 `}
                >
                  Live
                </label>
              </div>
              <div className="flex items-center ml-[30px]">
                <input
                  checked
                  style={{ "--data": header.radio_buttone.size }}
                  id="default-radio-3"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 "
                />
                <label
                  htmlFor="default-radio-3"
                  className={`ml-2 text-[${header.radio_buttone.text}px] font-medium text-gray-900 `}
                >
                  Done
                </label>
              </div>
              <CornerLinedCard
                childComp={
                  <div className="center w-[98%] h-[98%] flex justify-center">
                    <select
                      name="language"
                      id="language"
                      className="flex pl-[6px] justify-center w-[100%] [background:none] [color:white]"
                    >
                      <option
                        className="text-[2px]"
                        style={{ display: "none" }}
                        value="c++"
                        disabled
                        selected
                      >
                        Sorte by
                      </option>
                      <option value="javascript">cursed</option>
                      <option value="python">Regular</option>
                      <option value="java">Vanish</option>
                      <option value="java">Goldrush</option>
                    </select>
                  </div>
                }
                fill="[color:#2D313A]"
                cornerredius="0"
                stroke="[color:#4B5261]"
                strokesize={1}
                width={header.select_button.w}
                height={header.select_button.w * (21 / 100)}
                cornershape={[8, 0, 8, 0]}
                margine="ml-[38px]"
              />
            </div>
          </div>
          <div
            id="live-matches-cards"
            className=" grid grid-cols-3 gap-[20px] overflow-scroll  max-h-[60vh]"
          >
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
            <MatchCard class="" />
          </div>
        </section>
        {/* spletting general chat section and make a component for it  */}
        <GeneralChat/>
      </div>
    );
}

export default LiveMatchesAndGeneralChat