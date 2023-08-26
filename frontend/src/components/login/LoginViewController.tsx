import LoginViewModal from "./LoginViewModal"

const LoginViewController = ()=>{
    const {googleLink, ftLink, discordLink} = LoginViewModal();
    
    return {
        googleLink,
        ftLink,
        discordLink
    }
}

export default LoginViewController
