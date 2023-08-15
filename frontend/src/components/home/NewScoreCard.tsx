import useMeasure from "react-use-measure";
import Exclude from "/exclude.svg"

function NewScoreCard(){
    const [reff, boundfs] = useMeasure();

    const width = boundfs.width
    return(
        <>
            <div ref={reff} className="center flex justify-center w-full">
                {/* <img className="mr-[4px]" src={Exclude} alt="" /> */}
                <p style={{color:"white"}} className={`font-sans text-[${width * (8 / 100)}px]`}>New personal record</p>
            </div>
        </>
    )
}

export default NewScoreCard

