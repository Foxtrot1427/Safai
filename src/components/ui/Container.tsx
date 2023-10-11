import { Box } from '@chakra-ui/react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxW={'7xl'} mx={'auto'}>
      {children}
    </Box>
  );
};

export default Container;
