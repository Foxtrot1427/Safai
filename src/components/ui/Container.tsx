import { Box, ContainerProps as ChakraContainerProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps extends ChakraContainerProps {
  children: ReactNode;
}

const Container = ({ children, ...rest }: ContainerProps) => {
  return (
    <Box maxW={"7xl"} mx={"auto"} {...rest}>
      {children}
    </Box>
  );
};

export default Container;
