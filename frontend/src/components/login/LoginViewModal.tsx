import LoginModal from "./LoginModal"

const LoginViewModal = () => {
    const {redirect} = LoginModal()

    const test = "/api/auth/login"
    const googleLink = test + "/?redirect="+ redirect
    const ftLink = test + "/?redirect="+ redirect
    const discordLink = test + "/?redirect=" + redirect

    return {
        googleLink, ftLink, discordLink
    }
}

export default LoginViewModal