import { Outlet } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

const RootLayout = () => {
  return (
    <Box>
      {/* Header */}
      <Text>Header</Text>

      <Outlet />

      {/* Footer */}
      <Text>Footer</Text>
    </Box>
  );
};

export default RootLayout;
