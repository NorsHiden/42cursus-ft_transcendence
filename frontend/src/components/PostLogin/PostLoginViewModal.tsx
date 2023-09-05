import axios from "axios"
import { useState } from "react"
import PostLoginModal from "./PostLoginModal"


const PostLoginViewModal = ()=>{
    // const [uploaddone, setuploaddone] = useState(0)
    const {postdata} = PostLoginModal()
    

    const senddata = async (dataa:any)=>{
        const formdata = new FormData()
        formdata.append('avatar', dataa.avatarpath);
        formdata.append('username', dataa.name);
        formdata.append('display_name', dataa.displayname);
        console.log(formdata),
        postdata(formdata).then((response)=>{
            if (response.status == 201)
            {
                window.location.href = "http://localhost:5173/"
            }
            else {
                alert("(rah ba9i ma ka njibch l first data man 3ndek bla ma tjrab dir save m3a d9a try to change inputs and image)")
            }
        })
        // await PostLoginModal(formdata).then((data)=>{
        //     console.log("response from post view modal",data.response)
        //     if (data.response.status == 201)
        //     {
        //         window.location.href = "http://localhost:5173/"
        //     }
        //     else{
        //         alert("(rah ba9i ma ka njibch l first data man 3ndek bla ma tjrab dir save m3a d9a try to change inputs and image)")
        //     }
        // })
    }

    return{
        senddata
    }
}

export default PostLoginViewModal
