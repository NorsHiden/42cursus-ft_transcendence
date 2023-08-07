import "../../styles/index.css";
// import Regular from "../../public/regular.svg";
import { twMerge } from "tailwind-merge";
interface ButtonProps {
   sizey?: number;
   sizex?: number;
   color?: string; 
   margin?: string;
  }

function ButtonAct(props: ButtonProps) {
  const { width , color, sizex , margin} = props;

  return (
    <>
      <div className={
        twMerge("playbutton ",margin)
      }>
        <h2 className="play font-Rowdies text-[38px] "> PLAY </h2>
      </div>
      <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default ButtonAct;