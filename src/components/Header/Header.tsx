import { Box, HStack, Text } from "@chakra-ui/react";

const Header = ({
  masterTitle,
  title,
  sub_header,
}: {
  masterTitle: string;
  title: string;
  sub_header?: string;
}) => {
  return (
    <HStack>
      <Box fontWeight={500}>
        <Text color={"gray.400"} fontSize={"14px"}>
          {masterTitle} / {title}
        </Text>
        <Text fontSize={"24px"}>{sub_header ? sub_header : title}</Text>
      </Box>
    </HStack>
  );
};

export default Header;
