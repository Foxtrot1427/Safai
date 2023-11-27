import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import RootLayout from '@rsces/layout/RootLayout';
import Home from '@rsces/pages/Home';
import AboutUs from '@rsces/pages/AboutUs';
import AvailableWithUs from '@rsces/pages/AvailableWithUs';
import HowItWorks from '@rsces/pages/HowItWorks';
import WhatWeBuy from '@rsces/pages/WhatWeBuy';
import Contact from '@rsces/pages/Contact';

const router = createBrowserRouter([
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
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
