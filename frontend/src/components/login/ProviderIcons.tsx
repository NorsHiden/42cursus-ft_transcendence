import GoogleIcon from '@assets/socialIcons/GoogleIcon.tsx';
import FortyTwoIcon from '@assets/socialIcons/FortyTwoIcon';
import DiscordIcon from '@assets/socialIcons/DiscordIcon.tsx';
import { useGetAuthLink,useIconSize } from './hooks';
import { FC } from 'react';

type ProviderIconsProps = {
  className?: string;
};

const ProviderIcons:FC<ProviderIconsProps> = (
  {
    className
  }
) => {
  const { googleLink, ftLink, discordLink } = useGetAuthLink();
  const iconSize = useIconSize();

  return (
    <div id="providers" className={className}>
      <a href={googleLink} className=''>
        <div className='flex center text w-[48px] h-[48px]  lg:w-[64px] lg:h-[64px] bg-white rounded-full filter hover:opacity-75'>
          <GoogleIcon className='' size={iconSize} />
        </div>
      </a>
      <a href={discordLink}>
        <div className='flex center  w-[48px] h-[48px]  lg:w-[64px] lg:h-[64px] bg-[#5562EA] rounded-full filter hover:opacity-75'>
          <DiscordIcon className='text-white' size={iconSize} />
        </div>
      </a>
      <a href={ftLink}>
        <div className='flex center w-[48px] h-[48px] lg:w-[64px] lg:h-[64px] bg-white rounded-full filter hover:opacity-75'>
          <FortyTwoIcon className='text-black' size={iconSize} />
        </div>
      </a>
    </div>
  );
};

export default ProviderIcons;
