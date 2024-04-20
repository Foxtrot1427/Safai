import { Box, Button, Container, HStack, Text } from "@chakra-ui/react";
import Wrapper from "@rsces/components/ui/Wrapper";
import { colors } from "@rsces/theme/colors";
import Products from "./products";

const AvailableWithUs = () => {
  return (
    <>
      <Wrapper py={40}>
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
        <Container>
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
          <HStack justify={"center"} mt={12}>
            <Button
              borderRadius={"none"}
              bg={colors.primary}
              color={colors.white}
              px={12}
              py={4}
            >
              Load More
            </Button>
          </HStack>
        </Container>
      </Box>
    </>
  );
};
export default AvailableWithUs;
