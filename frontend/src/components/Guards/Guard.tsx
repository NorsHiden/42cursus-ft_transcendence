import React from "react"
import {Navigate} from "react-router-dom"
interface props {
    target: React.ReactNode
    redirect: string
}

function Guard(parent:props){
    
    const {target, redirect } = parent
    
    const logged_in = () =>{
        return (false)
    }

    const is_verified = () => {
        return (true)
    }

    if (logged_in() && is_verified())
    {
        return (
            <>
                {target}
            </>
        )
    }
    else if (!logged_in())
    {
        return (
            <>
                <Navigate to={`/login/?redirect=${redirect}`}/>
            </>
        )
    }
    else {
        return (
            <>
                <Navigate to="/postlogin"/>
            </>
        )
    }
}

export default Guard