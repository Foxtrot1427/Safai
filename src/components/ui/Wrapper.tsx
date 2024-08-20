import { Box, BoxProps } from "@chakra-ui/react";
import { colors } from "@rsces/theme/colors";
import { PropsWithChildren } from "react";

interface WrapperProps extends PropsWithChildren, BoxProps {
  bannerImg?: string;
}

const Wrapper = ({ bannerImg, children, ...rest }: WrapperProps) => {
  return (
    <Box
      as={"section"}
      position={"relative"}
      bgImage={bannerImg}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      _after={{
        position: "absolute",
        zIndex: 10,
        top: 0,
        content: '""',
        width: "100%",
        height: "100%",
        // backgroundImage: `linear-gradient(to right, ${colors.primary}, transparent)`,
        backgroundImage: `linear-gradient(to right, black, ${colors.primary})`,
        opacity: 0.3,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
