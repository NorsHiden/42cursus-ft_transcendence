import React from 'react';

import GoogleIcon from '@assets/socialIcons/GoogleIcon.tsx';
import FortyTwoIcon from '@assets/socialIcons/FortyTwoIcon';
import DiscordIcon from '@assets/socialIcons/DiscordIcon.tsx';

type ProviderIconsProps = {
  className?: string;
};

const ProviderIcons: React.FC<ProviderIconsProps> = ({ className }) => {
  const { googleLink, fortyTwoLink, discordLink } = {
    googleLink: '/api/auth/google/login' + window.location.search,
    fortyTwoLink: '/api/auth/42/login' + window.location.search,
    discordLink: '/api/auth/discord/login' + window.location.search,
  };

  return (
    <div id="providers" className={className}>
      <a href={googleLink} className="center w-24 h-24 xl:w-20 xl:h-20 bg-white rounded-full">
        <GoogleIcon className="text-black w-10 h-10 xl:w-8 xl:h-8" />
      </a>
      <a href={discordLink} className="center w-24 h-24  xl:w-20 xl:h-20 bg-[#5562EA] rounded-full">
        <DiscordIcon className="text-white w-10 h-10 xl:w-8 xl:h-8" />
      </a>
      <a href={fortyTwoLink} className="center w-24 h-24 xl:w-20 xl:h-20 bg-white rounded-full">
        <FortyTwoIcon className="text-black w-10 h-10 xl:w-8 xl:h-8" />
      </a>
    </div>
  );
};

export default ProviderIcons;