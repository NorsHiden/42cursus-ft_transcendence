import axios from "axios"
import { useState } from "react"
import PostLoginModal from "./PostLoginModal"


const PostLoginViewModal = ()=>{
    // const [uploaddone, setuploaddone] = useState(0)
    const {postdata,user,avatar} = PostLoginModal()
    const [UserExist, setUserExist] = useState(false)

    const senddata = async (dataa:any)=>{
        const formdata = new FormData()
        dataa.avatarpath?formdata.append('avatar', dataa.avatarpath):true
        formdata.append('username', dataa.name);
        formdata.append('display_name', dataa.displayname);
        console.log(formdata),
        postdata(formdata).then((response)=>{
            console.log("data in post data",formdata)
            if (response.status == 201)
            {
                // console.log("data has ben sent")
                window.location.href = "http://localhost:5173/"
            }
            else {
                setUserExist(true)
            }
        })
    }

    return{
        senddata,
        user,
        avatar,
        UserExist,
        setUserExist
    }
}

export default PostLoginViewModal
