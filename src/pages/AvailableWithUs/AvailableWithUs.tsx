import { Box, Container, HStack, Text } from "@chakra-ui/react";
import Wrapper from "@rsces/components/ui/Wrapper";
import { colors } from "@rsces/theme/colors";
import Products from "./products";

const AvailableWithUs = () => {
  return (
    <>
      <Wrapper py={28}>
        <Text textTransform={"uppercase"} align={"center"} fontSize={"2xl"}>
          You can order online
        </Text>
        <Text
          textTransform={"uppercase"}
          align={"center"}
          fontSize={"5xl"}
          fontWeight={"bold"}
        >
          Available with us
        </Text>
      </Wrapper>
      <Box as={"section"} py={16}>
        <Container maxW="7xl">
          <HStack gap={8} mb={8}>
            <Box
              w={"full"}
              flex={1}
              h={0}
              border={"2px solid"}
              borderColor={colors.gray_200}
            />
            <Text
              width={"fit-content"}
              position={"relative"}
              fontSize={"2xl"}
              fontWeight={600}
              textTransform={"uppercase"}
              color={colors.primary}
            >
              Products
            </Text>
            <Box
              w={"full"}
              flex={1}
              h={0}
              border={"2px solid"}
              borderColor={colors.gray_200}
            />
          </HStack>
          <Products />
        </Container>
      </Box>
    </>
  );
};
export default AvailableWithUs;
