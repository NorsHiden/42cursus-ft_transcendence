import { NavLink } from 'react-router-dom';
import error from '@assets/images/404.png';

const ErrorPage = () => {
  
  return (
    <div className="flex flex-col center h-screen w-screen">
      <img src={error} alt="404" className="  "/>
      <p className="font-serif text-white font-Bold text-2xl">Page not found</p>
        <NavLink to="/" className="font-poppins text-white font-Regular text-xl underline">
            Go Home
        </NavLink>
    </div>
  );
};

export default ErrorPage;
