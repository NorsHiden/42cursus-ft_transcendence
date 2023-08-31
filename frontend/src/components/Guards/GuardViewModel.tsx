import { useState } from "react"
import GuardModel from "./GuardModel"

const GuardViewModel = ()=>{
    const [loged,setloged] = useState(1);
    const [verified,setverified] = useState(1);

    (async ()=>{
        await GuardModel().then((data)=>{
                
            if (data.response?.status == 200)
                {
                    setloged(1);
                }
                else{
                    setloged(0);
                }
            if(data.verified?.status == 200)
            {
                if (data.verified?.data == true)
                {
                    setverified(1)
                    console.log("user is verified")
                }
                else if (data.verified?.data == false)
                {
                    setverified(0)
                    console.log("user is not verified")
                }
            }
            }
            )
            
    })()
    
    return {
        loged,
        verified
    }
}

export default GuardViewModel