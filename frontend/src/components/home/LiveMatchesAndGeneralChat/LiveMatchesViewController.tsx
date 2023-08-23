
import useMeasure from "react-use-measure"

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

interface prop {
    reminder:number
  }


const LiveMatchesViewControler = (dataa:prop) => {
    const [header_ref, data] = useMeasure()
    
    const taken = 100 * (dataa.reminder / window.innerHeight)

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

    return {
        header_ref,
        header,
        taken
    }
}

export default LiveMatchesViewControler