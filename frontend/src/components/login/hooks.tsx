import {useScreenType} from '@hooks/index';
import { ScreenType } from '@globalTypes/types';
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

export function useIconSize(): number {
  const screenType = useScreenType();
  const [iconSize, setIconSize] = useState<number>(32);

  // set icon size based on screen type (responsive) you may adjust the values
  useEffect(() => {
    switch (screenType) {
      case ScreenType.BigScreen:
      case ScreenType.DesktopOrLaptop:
        setIconSize(32);
        break;
      case ScreenType.TabletOrMobile:
          setIconSize(24);
          break;
      case ScreenType.Portrait:
      case ScreenType.Unknown:
        setIconSize(24);
        break;
    }
  }, [screenType]);

  return iconSize;
}

