import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ChakraProvider>{children}</ChakraProvider>
    </BrowserRouter>
  );
};

export default Provider;
