import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../auth'

function AuthRoute({ children, redirectTo }) {
  return isLoggedIn() ? <Navigate to={redirectTo} /> : children;
}

export default AuthRoute;
