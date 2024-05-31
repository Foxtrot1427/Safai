import RootLayout from "@rsces/layout/RootLayout";
import AboutUs from "@rsces/pages/AboutUs";
import Login from "@rsces/pages/Admin/login";
import Register from "@rsces/pages/Admin/register";
import AvailableWithUs from "@rsces/pages/AvailableWithUs/AvailableWithUs";
import Contact from "@rsces/pages/Contact";
import Home from "@rsces/pages/Home";
import HowItWorks from "@rsces/pages/HowItWorks";
import WhatWeBuy from "@rsces/pages/what-we-buy";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import AdminDonations from "@rsces/pages/Admin/donations";
import AdminLayout from "@rsces/pages/Admin/Layout";
import AdminProducts from "@rsces/pages/Admin/Products";
import { useAuthentication } from "@rsces/service/service-auth";
import { Center, Spinner } from "@chakra-ui/react";
import { useMemo } from "react";
import AdminOrganizations from "@rsces/pages/Admin/Organizations";
import OrganizationProfile from "@rsces/pages/Admin/Organizations/profile";

const authRoutes: RouteObject[] = [
  {
    path: NAVIGATION_ROUTES.ADMIN_LOGIN,
    element: <Login />,
  },
];

const openRoutes: RouteObject[] = [
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
];

const userRoutes = [...authRoutes, ...openRoutes];

const adminRoutes: RouteObject[] = [
  ...openRoutes,
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
      {
        path: NAVIGATION_ROUTES.ADMIN_ORGANIZATIONS,
        element: <AdminOrganizations />,
      },
      {
        path: NAVIGATION_ROUTES.ORGANIZATION_PROFILE,
        element: <OrganizationProfile />,
      },
    ],
  },
  {
    path: NAVIGATION_ROUTES.NO_MATCH,
    element: <Navigate to={NAVIGATION_ROUTES.ADMIN_DASHBOARD} />,
  },
];

const AppRoutes = () => {
  const { data: isAdmin, isLoading } = useAuthentication();

  const router = useMemo(
    () => createBrowserRouter(isAdmin ? adminRoutes : userRoutes),
    [isAdmin],
  );

  if (isLoading) {
    return (
      <Center h={"100vh"}>
        <Spinner />
      </Center>
    );
  }

  return <RouterProvider router={router} />;
};

export default AppRoutes;
