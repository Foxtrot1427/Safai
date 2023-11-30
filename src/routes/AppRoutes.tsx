import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import RootLayout from '@rsces/layout/RootLayout';
import Home from '@rsces/pages/Home';
import AboutUs from '@rsces/pages/AboutUs';
import AvailableWithUs from '@rsces/pages/AvailableWithUs';
import HowItWorks from '@rsces/pages/HowItWorks';
import WhatWeBuy from '@rsces/pages/what-we-buy';
import Contact from '@rsces/pages/Contact';
import Login from '@rsces/pages/Admin/login';
import TokenService from '@rsces/service/service-token';
import Register from '@rsces/pages/Admin/register';

import AdminLayout from '@rsces/pages/Admin/Layout';
import AdminDonations from '@rsces/pages/Admin/donations';

const router = createBrowserRouter([
  {
    path: NAVIGATION_ROUTES.ADMIN_LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <RootLayout />,
    children: [
      {
        path: NAVIGATION_ROUTES.BASE,
        element: <Home />,
      },
      {
        path: NAVIGATION_ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: NAVIGATION_ROUTES.WHAT_WE_BUY,
        element: <WhatWeBuy />,
      },
      {
        path: NAVIGATION_ROUTES.HOW_IT_WORKS,
        element: <HowItWorks />,
      },
      {
        path: NAVIGATION_ROUTES.AVAILABLE_WITH_US,
        element: <AvailableWithUs />,
      },
      {
        path: NAVIGATION_ROUTES.CONTACT,
        element: <Contact />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.BASE} replace />,
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: NAVIGATION_ROUTES.ADMIN_REGISTER,
    element: <Register />,
  },
  {
    path: NAVIGATION_ROUTES.ADMIN_LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.ADMIN_DASHBOARD,
    element: <AdminLayout />,
    children: [
      {
        path: NAVIGATION_ROUTES.ADMIN_DONATIONS,
        element: <AdminDonations />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <RootLayout />,
    children: [
      {
        path: NAVIGATION_ROUTES.BASE,
        element: <Home />,
      },
      {
        path: NAVIGATION_ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: NAVIGATION_ROUTES.WHAT_WE_BUY,
        element: <WhatWeBuy />,
      },
      {
        path: NAVIGATION_ROUTES.HOW_IT_WORKS,
        element: <HowItWorks />,
      },
      {
        path: NAVIGATION_ROUTES.AVAILABLE_WITH_US,
        element: <AvailableWithUs />,
      },
      {
        path: NAVIGATION_ROUTES.CONTACT,
        element: <Contact />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.BASE} replace />,
  },
]);

const AppRoutes = () => {
  const isAdmin = TokenService.isAuthenticated();

  return (
    <>
      <RouterProvider router={isAdmin ? adminRouter : router} />
    </>
  );
};

export default AppRoutes;
