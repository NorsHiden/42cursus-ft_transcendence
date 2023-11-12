import axios from 'axios';

const GuardModel = async () => {
  let response, verified;
  try {
    response = await axios.get(
      'http://localhost:5173/api/users/@me/is-loggedin',
    );
  } catch (error: any) {
    response = error.response;
  }

  try {
    verified = await axios.get(
      'http://localhost:5173/api/users/@me/is-verified',
    );
  } catch (error) {}

  return {
    response,
    verified,
  };
};

export default GuardModel;
