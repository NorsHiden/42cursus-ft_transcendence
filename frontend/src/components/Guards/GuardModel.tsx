import axios from "axios"

const GuardModel = async ()=> {
    let response,verified
    try {

         response = await axios.get('http://localhost:5173/api/users/is-loggedin');
         
        //  console.log("model", response)
    }
    catch(error:any)
    {
        response = error.response
    }
    
    try {
        verified = await axios.get('http://localhost:5173/api/users/is-verified');
    }
    catch(error){

    }

    return {
        response,verified
    }
}

export default GuardModel;