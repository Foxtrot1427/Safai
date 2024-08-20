import { Box } from "@chakra-ui/react";

const IconWrapper = ({
  children,
  childHoverColor = "primary.500",
}: IconWrapperProps) => {
  return (
    <Box
      __css={{
        "&:hover > *": {
          color: `${childHoverColor} !important`,
          transition: "color 0.2s ease-in-out",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default IconWrapper;

type IconWrapperProps = {
  children: React.ReactNode;
  childHoverColor?: string;
};
