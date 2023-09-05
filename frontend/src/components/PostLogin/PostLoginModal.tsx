import axios from "axios"
interface props {
    name:string,
    display:string,
    avatar:string,
    avatarpath:string
}

const PostLoginModal = ()=>{

    
    const postdata = async (formdata:any)=>{
        return (await axios.post("http://localhost:5173/api/users/@me/complete-login", formdata))
    }
    
    const getUserData =async () => {
        return (await axios.get())
    }
    return{
        postdata
    }
}

export default PostLoginModal
