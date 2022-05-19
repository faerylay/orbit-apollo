import React, { lazy } from 'react';
import MinimalComponent from '../components/MinimalComponent';
import { Loadable } from '../components/MainComponent'
import AuthRoute from './AuthRoute';
import NotFound from '../pages/NotFound'
const AuthLogin = Loadable(lazy(() => import('../pages/Authentication/Login')))
const AuthRegister = Loadable(lazy(() => import('../pages/Authentication/Register')))

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalComponent />,
  children: [
    {
      path: '/login',
      element: <AuthRoute redirectTo="/"><AuthLogin /></AuthRoute>
    },
    {
      path: '/register',
      element: <AuthRoute redirectTo="/"><AuthRegister /></AuthRoute>
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default AuthenticationRoutes;
