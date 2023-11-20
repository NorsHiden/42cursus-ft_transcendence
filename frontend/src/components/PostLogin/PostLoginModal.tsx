import axios, {AxiosError} from "axios"
// import axios from "axios"
import { useSearchParams,useLoaderData } from "react-router-dom"
import { User } from '@/types/user'

const PostLoginModal = ()=>{
    const [searchParams] = useSearchParams();
    let user:User = useLoaderData() as User;

     user = {
        ...user,
        username: searchParams.get("username") || user.username,
        display_name: searchParams.get("display_name") || user.display_name,
        profile:{
            ...user.profile,
            avatar: searchParams.get("avatar") || user.profile.avatar
        }
    }

    const postdata = (formdata: FormData) => {
        return axios.patch("/api/users/@me", formdata)
          .then(response => {
            console.log("user response:", response);
            return response;
          })
          .catch((e: AxiosError) => {
            throw e;
          });
      };



    return{
        postdata,
        user,
    }
}

export default PostLoginModal
