import axios from "axios"
import { string } from "mathjs"
import { useSearchParams,useLoaderData } from "react-router-dom"

interface user_info {
    username:string | null,
    display_name:string | null,
    avatar:string | null,
}

const PostLoginModal = ()=>{
    const [searchParams] = useSearchParams();
    const user_data = useLoaderData();
    const avatar = user_data.profile.avatar

    console.log(avatar)
    let user:user_info = {
        username : searchParams.get("username"),
        display_name:searchParams.get("display_name"),
        avatar:searchParams.get("avatar"),
    }

    const postdata = async (formdata:any)=>{
        try{
            const response = await axios.post("http://localhost:5173/api/users/@me/complete-login", formdata) 
            return (response)
        }
        catch(e)
        {
            return(e.response)
        }
        
    }

    return{
        postdata,
        user,
        avatar
    }
}

export default PostLoginModal
