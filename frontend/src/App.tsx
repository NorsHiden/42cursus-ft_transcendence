import { Overview, MatchHistory, Achievements, Settings, ManageFriends } from '@components/profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostLogin, { postLoginLoader } from '@pages/PostLogin';
import Profile, { profileLoader } from '@pages/Profile';
import Layout, { LayoutLoader } from '@pages/Layout';
import OTP2fa, { otpLoader } from '@pages/OTP2fa';
import { Leaderboard } from '@pages/Leaderboard';
import Discovery from '@pages/Discovery';
import Login from '@pages/Login';
import { Toaster } from 'sonner';
import Home from '@pages/Home';
import Game from '@pages/Game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: LayoutLoader,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/discovery',
        element: <Discovery />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/game/:gameId',
        element: <Game />,
      },
      {
        path: '/:user',
        id: 'profile',
        element: <Profile />,
        loader: ({ params }) => profileLoader(params.user),
        children: [
          {
            path: '/:user/settings',
            element: <Settings />,
          },
          {
            path: '/:user/overview',
            element: <Overview />,
          },
          {
            path: '/:user/matchhistory',
            element: <MatchHistory />,
          },
          {
            path: '/:user/achievements',
            element: <Achievements />,
          },
          {
            path: '/:user/friends',
            element: <ManageFriends />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/postlogin',
    loader: postLoginLoader,
    element: <PostLogin />,
  },
  {
    path: '/2fa-verification',
    loader: otpLoader,
    element: <OTP2fa />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
