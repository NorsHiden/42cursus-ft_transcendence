import { NavLink } from 'react-router-dom';
import Card from '@components/Card';

interface NavLinkCardProps {
  to: string;
  children: React.ReactNode;
  cut?: number;
}

const NavLinkButton: React.FC<NavLinkCardProps> = ({ to, children, cut }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <Card
        className={`${
          isActive ? ' h-[30px] text-[#FE5821] rounded-lg' : 'text-transparent  h-[30px]'
        } flex center`}
        cut={cut}
        {...(isActive ? { borderRadius: 10, borderColor: '#FF8C66', borderWidth: 1.5 } : {})}
      >
        <button className="">
          <p className="font-sans font-medium text-white opacity-75" style={{ padding: '1.5em' }}>
            {children}
          </p>
        </button>
      </Card>
    )}
  </NavLink>
);


export default NavLinkButton;
