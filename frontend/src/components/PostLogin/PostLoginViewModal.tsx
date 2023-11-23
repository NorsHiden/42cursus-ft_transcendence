// import {AxiosError} from "axios"
import { useState } from "react"
import PostLoginModal from "./PostLoginModal"
// import { User } from "./types"
import { ExtendedUser } from "./PostLoginViewController"

const PostLoginViewModal = ()=>{
      const {postdata,user} = PostLoginModal()
      const [errors, seterrors] = useState<string>("")
      const [loading, setloading] = useState<boolean>(false)

      const senddata = async (user:ExtendedUser)=>{
          const formdata = new FormData()
          console.log("avatar to upload",user.fileToupload)
          user.fileToupload ?formdata.append('avatar', user.fileToupload):true
          formdata.append('username', user.username);
          formdata.append('display_name', user.display_name);

          setloading(true);
          try {
              const response = await postdata(formdata);
              if (response.status === 200) {
                window.location.href = "/";
              }
              else{
                    seterrors(response.data.message[0]);
              }
                setloading(false);
          } catch (error:any) {
                seterrors(error.response.data.message[0]);
                setloading(false);
            }
      }

      return{
          senddata,
          user,
          errors,
          seterrors,
          haserrors : errors.length > 0,
            loading,
      }
}

export default PostLoginViewModal
