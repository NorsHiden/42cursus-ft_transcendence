import { useSearchParams } from "react-router-dom"


const LoginModal = ()=>{
    // get the redirect value passed to component as queryparams ( /login?redirect=blabla)
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect')
    
    return {redirect}
}

export default LoginModal