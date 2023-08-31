import React, { useState } from "react"
import {Navigate} from "react-router-dom"
interface props {
    target: React.ReactNode
    redirect: string
}
import GuardViewModel from "./GuardViewModel"

function Guard(parent:props){
    
    const {target, redirect } = parent
    const {loged, verified} = GuardViewModel()

    
    if (loged && verified)
    {
        return (
            <>
                {target}
            </>
        )
    }
    else if (!loged)
    {
        return (
            <>
                <Navigate to={`/login?redirect=${redirect}`}/>
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