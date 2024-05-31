import {
  Box,
  Flex,
  ListIcon,
  ListItem,
  Square,
  StackDivider,
  Text,
  UnorderedList,
  VStack,
  Image,
} from "@chakra-ui/react";
import { ThreeR } from "@rsces/assets/images";
import Container from "@rsces/components/ui/Container";
import Wrapper from "@rsces/components/ui/Wrapper";
import { colors } from "@rsces/theme/colors";

import { PiPaperPlaneRightFill } from "react-icons/pi";

const AboutUs = () => {
  return (
    <>
      <Wrapper py={40}>
        <Text textTransform={"uppercase"} align={"center"} fontSize={"2xl"}>
          Our Company & Motto
        </Text>
        <Text
          textTransform={"uppercase"}
          align={"center"}
          fontSize={"5xl"}
          fontWeight={"bold"}
        >
          About us
        </Text>
      </Wrapper>

      <Box as={"section"} py={24} bgColor={colors.gray_200}>
        <Container>
          <Flex gap={48}>
            <VStack divider={<StackDivider borderColor={colors.gray} />}>
              {/* Icon */}
              <VStack flex={1} spacing={4}>
                <Text
                  position={"relative"}
                  fontSize={"6xl"}
                  fontWeight={"bold"}
                  _after={{
                    content: '"YRS"',
                    display: "inline-block",
                    fontSize: "2xl",
                    position: "absolute",
                    top: 4,
                    left: "105%",
                  }}
                >
                  4
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  Years of <br /> Establishment
                </Text>
              </VStack>

              {/* Icon */}
              <VStack flex={1} spacing={0}>
                <Text
                  position={"relative"}
                  fontSize={"6xl"}
                  fontWeight={"bold"}
                  _after={{
                    content: '"PCS"',
                    display: "inline-block",
                    fontSize: "2xl",
                    position: "absolute",
                    top: 4,
                    left: "105%",
                  }}
                >
                  1000
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  Bottles
                </Text>
              </VStack>

              {/* Icon */}
              <VStack flex={1} spacing={0}>
                <Text
                  position={"relative"}
                  fontSize={"6xl"}
                  fontWeight={"bold"}
                  _after={{
                    content: '"KGS"',
                    display: "inline-block",
                    fontSize: "2xl",
                    position: "absolute",
                    top: 4,
                    left: "105%",
                  }}
                >
                  1200
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  Papers
                </Text>
              </VStack>

              {/* Icon */}
              <VStack flex={1} spacing={0}>
                <Text
                  position={"relative"}
                  fontSize={"6xl"}
                  fontWeight={"bold"}
                  _after={{
                    content: '"PCS"',
                    display: "inline-block",
                    fontSize: "2xl",
                    position: "absolute",
                    top: 4,
                    left: "105%",
                  }}
                >
                  10000
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  Ewaste
                </Text>
              </VStack>
            </VStack>

            <VStack flex={1} spacing={8}>
              <Text fontSize={"3xl"} fontWeight={"bold"}>
                Few Words About Us
              </Text>
              <Text fontSize={"xl"} align={"center"} mt={8}>
                Phohor Mohor is a pioneering company established in BS 2070,
                specializing in Recyclable and Reusable solid waste management,
                Located in Madhyapur-3 Bhatapur. With a strong commitment to
                excellence and sustainability.
              </Text>

              <Text align={"center"} lineHeight={"tall"}>
                Phohor Mohor is dedicated to reduce the solid waste are being
                dumped to dumping site and create awareness to our society of
                the waste management. Our team of skilled professionals is
                driven by a passion for innovation and a desire to create a
                positive impact on the environment. At Phohor Mohor, we strive
                to be a leader in our field, constantly seeking new ways to
                improve and innovate. With a focus on research and development,
                we are always looking for new technologies and methodologies to
                enhance our services and deliver the best possible results to
                our society and environment. Our mission is to promote 3R
                whereas Reduce the waste or scrap are being emitted, Re-use the
                waste or scrap are being emitted and Recycle the waste or scrap
                are being emitted by human, While promoting environmental
                sustainability and social responsibility. With a firm belief in
                the power of collaboration and innovation, we are committed to
                building a better future for generations to come.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
      <Box as={"section"} py={24} position={"relative"} w={"100%"}>
        <Box maxW={"80%"} mx={"auto"}>
          <Text textTransform={"uppercase"} align={"center"} fontSize={"3xl"}>
            We provide a range of services to our clients
          </Text>
          <Text textTransform={"uppercase"} align={"center"} fontSize={"1xl"}>
            Waste Collection:
            <Text>
              We collect recyclable and reusable waste materials from
              households, businesses,industries, institution and social
              organization. Our team uses specialized equipment to ensure
              efficient and safe waste collection
            </Text>
          </Text>
        </Box>
      </Box>
      <Box
        as={"section"}
        py={24}
        position={"relative"}
        bgColor={colors.gray_200}
      >
        <Container>
          <Flex gap={10}>
            <Box w={"40%"}>
              <Image src={ThreeR} alt={"recycle"} w={"full"} />
            </Box>
            <Box w={"60%"}>
              <Text textTransform={"uppercase"} fontSize={"2xl"}>
                Our Mission, Vision & Goals
              </Text>
              <Text
                textTransform={"uppercase"}
                fontSize={"5xl"}
                fontWeight={"bold"}
              >
                Why we exist?
              </Text>

              <Box mt={12}>
                <Text fontSize={"xl"} fontWeight={"bold"} mb={4}>
                  Our Mission
                </Text>
                <UnorderedList listStyleType={"none"} spacing={2}>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Collect the dry solid waste from door to door and use
                    integrated 3R (Reuse, Reduce and Recycle) approach
                  </ListItem>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Quantity of Landfill waste can be significantly reduced by
                    collecting the dry waste in source.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Research for new innovative product from waste material.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Create employment opportunity through waste management.
                  </ListItem>
                </UnorderedList>

                <Text mt={8} fontSize={"xl"} fontWeight={"bold"} mb={4}>
                  Our Vision
                </Text>
                <UnorderedList listStyleType={"none"} spacing={2}>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Solid waste has significant economic value.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Solid waste should be separate in source according to
                    degradable and non-degradable.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                    Solid waste has many opportunity.
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </Flex>
          <Flex mt={16} bgColor={colors.primary} align={"center"} gap={8}>
            <Square size={24} bg={colors.gray_500} />
            <Text color={colors.white} flex={1} fontSize={"xl"}>
              <span style={{ fontWeight: 700 }}>Our Goal: </span>
              Establish recycle factory for dry solid waste.
            </Text>
          </Flex>
        </Container>
        {/* <Container></Container> */}
      </Box>
    </>
  );
};

export default AboutUs;
