import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '@components/Card';

interface NavLinkCardProps {
  to: string;
  cut?: number;
  children: React.ReactNode;
}

const NavLinkButton: React.FC<NavLinkCardProps> = ({ to, cut, children }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <Card
        cut={cut || 25}
        borderRadius={25}
        className={`center h-10 px-6 cursor-pointer ${
          isActive ? 'text-primary' : 'text-transparent'
        }`}
        {...(isActive ? { borderColor: '#FF8C66', borderWidth: 0 } : {})}
      >
        <p className="text-[18px] text-white opacity-75">{children}</p>
      </Card>
    )}
  </NavLink>
);

export default NavLinkButton;
