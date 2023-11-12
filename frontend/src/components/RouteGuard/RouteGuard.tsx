import React from 'react';
import { useNavigate } from 'react-router-dom';

import GuardViewModel from './RouteGuardViewModel';

interface GuardProps {
  children: React.ReactNode;
  redirect: string;
}

const Guard: React.FC<GuardProps> = ({ children, redirect }) => {
  const navigate = useNavigate();
  const { isLogged, isVerified } = GuardViewModel();

  if (isLogged && isVerified) {
    return children;
  } else if (!isLogged) {
    navigate(`/login?redirect=${redirect}`);
  } else {
    navigate('/postlogin');
  }
};

export default Guard;
