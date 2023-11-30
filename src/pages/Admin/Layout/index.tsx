import { Box, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Header from '@rsces/components/Header/Header';

const AdminLayout = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const location = useLocation();
  const [masterTitle, title] = location.pathname
    .split('/')
    .filter(Boolean)
    .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1));

  return (
    <Fragment>
      <Flex minHeight="100vh" fontSize={14}>
        <Box height={'100vh'} position={'sticky'} top={0}>
          <Sidebar isOpen={isOpen} onToggle={onToggle} />
        </Box>
        <VStack alignItems={'stretch'} gap={0} flex={1} overflow={'hidden'}>
          <Navbar onToggle={onToggle} />
          <Box maxWidth={'full'} p={8}>
            <Header masterTitle={masterTitle} title={title} />
            <Outlet />
          </Box>
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default AdminLayout;
