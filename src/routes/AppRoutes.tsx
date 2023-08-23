import { useRoutes } from 'react-router-dom';

import { NAVIGATION_ROUTES } from './routes.constant';
import RootLayout from '../layout/RootLayout';

const publicRoutes = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <RootLayout />,
  },
];

const AppRoutes = () => {
  const routes = useRoutes(publicRoutes);

  return routes;
};

export default AppRoutes;
