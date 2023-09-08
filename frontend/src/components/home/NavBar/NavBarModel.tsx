import axios from "axios"

const NavBarModel = ()=>{

    
    const getuser = async()=>{
        return (await axios.get("http://localhost:5173/api/users/@me"))
    }
    
    return {
        getuser
    }
}

export default NavBarModel