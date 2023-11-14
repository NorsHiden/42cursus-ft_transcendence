import { useState } from 'react';
import GuardModel from './RouteGuardModel';

const GuardViewModel = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [isVerified, setIsVerified] = useState(true);

  //   (async () => {
  //     await GuardModel().then((data) => {
  //       setIsLogged(data.response?.status == 200);
  //       setIsVerified(
  //         data.verified?.status == 200 && data.verified?.data.is_verified,
  //       );
  //     });
  //   })();

  return {
    isLogged,
    isVerified,
  };
};

export default GuardViewModel;
