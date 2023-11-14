import axios from 'axios';

const NavBarModel = () => {
  return {
    getUser: async () => await axios.get('http://localhost:5173/api/users/@me'),
  };
};

export default NavBarModel;
