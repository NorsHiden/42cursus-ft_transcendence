import { useEffect, useState } from 'react';
import NavBarModel from './NavBarModel';

interface User {
  username: string;
  display_name: string;
  avatar: string;
}

const NavBarViewModel = () => {
  const [user, setuser] = useState<User | null>(null);
  const { getUser } = NavBarModel();

  useEffect(() => {
    getUser().then((response) => {
      if (response.status == 200) {
        setuser({
          username: response.data.username,
          display_name: response.data.display_name,
          avatar: response.data.profile.avatar,
        });
      } else {
        alert('chi blan machi hwa hdak jrab mra khra a sadi9i');
      }
      console.log(response.data);
    });
  }, []);

  return { user };
};

export default NavBarViewModel;
