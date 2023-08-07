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

    </>
  );
}

export default ButtonAct;