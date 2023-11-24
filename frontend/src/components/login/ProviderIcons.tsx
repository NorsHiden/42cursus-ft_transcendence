import GoogleIcon from '@assets/socialIcons/GoogleIcon.tsx';
import FortyTwoIcon from '@assets/socialIcons/FortyTwoIcon';
import DiscordIcon from '@assets/socialIcons/DiscordIcon.tsx';
import { useGetAuthLink } from './hooks';
import { FC } from 'react';

type ProviderIconsProps = {
  className?: string;
};

const ProviderIcons:FC<ProviderIconsProps> = (
  {
    className
  }
) => {
  const { googleLink, ftLink, discordLink } = {
    googleLink: "/api/auth/google/login" + window.location.search,
    ftLink: "/api/auth/42/login" + window.location.search,
    discordLink: "/api/auth/discord/login" + window.location.search
  };

  return (
    <div id="providers" className={className}>
      <a href={googleLink} className=''>
        <div className='flex center text w-[48px] h-[48px]  lg:w-[64px] lg:h-[64px] bg-white rounded-full filter hover:opacity-75'>
          <GoogleIcon className='w-[24px] h-[24px] md:w-[32px] md:h-[32px]' />
        </div>
      </a>
      <a href={discordLink}>
        <div className='flex center  w-[48px] h-[48px]  lg:w-[64px] lg:h-[64px] bg-[#5562EA] rounded-full filter hover:opacity-75'>
          <DiscordIcon className='text-white w-[24px] h-[24px] md:w-[32px] md:h-[32px]'  />
        </div>
      </a>
      <a href={ftLink}>
        <div className='flex center w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] bg-white rounded-full filter hover:opacity-75'>
          <FortyTwoIcon className='text-black w-[24px] h-[24px] md:w-[32px] md:h-[32px]'  />
        </div>
      </a>
    </div>
  );
};

export default ProviderIcons;
