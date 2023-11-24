import { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useGetAuthLink () {
    //get redirect value from the modal and join it with api endpoint  ( /api/auth/provider/login?redirect=blabla)
    // const {redirect} = LoginModal()
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect')
    
    if (!redirect) {
        return {
            googleLink: "/api/auth/google/login",
            ftLink: "/api/auth/42/login",
            discordLink: "/api/auth/discord/login"
        }
    }
    const googleLink = "/api/auth/google/login" + "?redirect="+ redirect
    const ftLink = "/api/auth/42/login" + "?redirect="+ redirect
    const discordLink = "/api/auth/discord/login" + "?redirect=" + redirect

    return {
        googleLink, ftLink, discordLink
    }  
}

