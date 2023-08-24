import { useSearchParams } from "react-router-dom"

const LoginModal = ()=>{
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect')
    
    return {redirect}
}

export default LoginModal