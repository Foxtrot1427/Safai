import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
    },
  },
});

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default Provider;
