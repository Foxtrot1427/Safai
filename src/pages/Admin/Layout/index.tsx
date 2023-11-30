import React, { Fragment } from 'react';
import { Box, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Fragment>
      <Flex minHeight="100vh" fontSize={14}>
        <Sidebar isOpen={isOpen} onToggle={onToggle} />
        <VStack alignItems={'stretch'} gap={0} flex={1} overflow={'hidden'}>
          <Navbar onToggle={onToggle} />
          <Box maxWidth={'full'} p={5}>{children}</Box>
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default LayoutDashboard;
