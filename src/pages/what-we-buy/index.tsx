import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import {
  ETrash,
  Newspapers,
  Trash,
  WhatWeBuyBanner,
} from "@rsces/assets/images";
import Container from "@rsces/components/ui/Container";
import Wrapper from "@rsces/components/ui/Wrapper";
import { colors } from "@rsces/theme/colors";
import Donation from "./donation/Donation";

const WhatWeBuy = () => {
  return (
    <>
      <Wrapper bannerImg={WhatWeBuyBanner} py={28}>
        <Text
          textTransform={"uppercase"}
          align={"center"}
          fontSize={"2xl"}
          color={colors.gray_100}
        >
          You can sell items
        </Text>
        <Text
          textTransform={"uppercase"}
          align={"center"}
          fontSize={"5xl"}
          fontWeight={"bold"}
          color={colors.gray_100}
        >
          What we buy
        </Text>
      </Wrapper>
      <Box bgColor={colors.gray_200} py={24}>
        <Container>
          {/* <Text textTransform={"uppercase"} fontSize={"2xl"} align={"center"}>
              Fill up form to sell trash
            </Text>
            <Text
              textTransform={"uppercase"}
              fontSize={"5xl"}
              fontWeight={"bold"}
              align={"center"}
            >
              Sell Now
            </Text> */}

          <Flex mt={12} gap={16} direction={{ base: "column", lg: "row" }}>
            <Box flex={0.6}>
              <VStack>
                <Text
                  align={"center"}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  w={"50%"}
                >
                  Please fill the form if you want to &nbsp;
                  <span
                    style={{
                      color: colors.primary,
                      fontSize: "50px",
                      display: "block",
                    }}
                  >
                    SELL
                  </span>
                  &nbsp; your trash
                </Text>

                <Box
                  display={"flex"}
                  w={"250px"}
                  flexWrap={"wrap"}
                  ml={"-20px"}
                  mt={12}
                >
                  <Box
                    width={"100px"}
                    aspectRatio={1}
                    bg={colors.white}
                    border={`3px solid ${colors.primary}`}
                    transform={"rotate(45deg) translate(20px, 5px)"}
                    overflow={"hidden"}
                  >
                    <Image
                      src={Trash}
                      h={"full"}
                      objectFit={"cover"}
                      transform={"rotate(-45deg) "}
                    />
                  </Box>
                  <Box
                    width={"100px"}
                    transform={"rotate(45deg) translate(50px, -25px)"}
                    border={`3px solid ${colors.primary}`}
                    aspectRatio={1}
                    bg={colors.white}
                    overflow={"hidden"}
                  >
                    <Image
                      src={Newspapers}
                      h={"full"}
                      objectFit={"cover"}
                      transform={"rotate(-45deg) "}
                    />
                  </Box>
                  <Box
                    width={"100px"}
                    transform={"rotate(45deg) translate(55px, -60px)"}
                    border={`3px solid ${colors.primary}`}
                    aspectRatio={1}
                    bg={colors.white}
                    overflow={"hidden"}
                  >
                    <Image
                      src={ETrash}
                      h={"full"}
                      objectFit={"cover"}
                      transform={"rotate(-45deg) "}
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>

            <Box flex={1} bg={colors.gray_100} borderRadius={"xl"} p={8}>
              <Donation />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default WhatWeBuy;
