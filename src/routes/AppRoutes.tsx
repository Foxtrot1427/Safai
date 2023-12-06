import RootLayout from '@rsces/layout/RootLayout';
import AboutUs from '@rsces/pages/AboutUs';
import Login from '@rsces/pages/Admin/login';
import Register from '@rsces/pages/Admin/register';
import AvailableWithUs from '@rsces/pages/AvailableWithUs';
import Contact from '@rsces/pages/Contact';
import Home from '@rsces/pages/Home';
import HowItWorks from '@rsces/pages/HowItWorks';
import WhatWeBuy from '@rsces/pages/what-we-buy';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import AdminDonations from '@rsces/pages/Admin/donations';
import AdminLayout from '@rsces/pages/Admin/Layout';
import { useAuthentication } from '@rsces/service/service-auth';
import AdminProducts from '@rsces/pages/Admin/Products';

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
    element: <Navigate to={NAVIGATION_ROUTES.ADMIN_DASHBOARD} />,
  },
  {
    path: NAVIGATION_ROUTES.ADMIN_DASHBOARD,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={NAVIGATION_ROUTES.ADMIN_DONATIONS} />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_DONATIONS,
        element: <AdminDonations />,
      },
      {
        path: NAVIGATION_ROUTES.ADMIN_PRODUCTS,
        element: <AdminProducts />,
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
  const { data: isAdmin } = useAuthentication();

  return (
    <>
      <RouterProvider router={isAdmin ? adminRouter : router} />
    </>
  );
};

export default AppRoutes;
