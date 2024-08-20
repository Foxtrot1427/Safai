import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "@rsces/components/globals/Navbar";
import Footer from "@rsces/components/globals/Footer";

const RootLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default RootLayout;
