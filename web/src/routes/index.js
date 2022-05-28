import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function ThemeRoutes() {
  let routes = useRoutes([MainRoutes, AuthenticationRoutes]);
  return routes
}
