import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  ListIcon,
  ListItem,
  SimpleGrid,
  StackDivider,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { ThreeR } from "@rsces/assets/images";
import Container from "@rsces/components/ui/Container";
import Wrapper from "@rsces/components/ui/Wrapper";
import { colors } from "@rsces/theme/colors";
import { MISSIONS, SERVICES, VISIONS } from "../data";

import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useStats } from "@rsces/service/service-stats";
import { getYearsSince } from "@rsces/hooks/getYearsSince";

const Service = ({ service }: { service: (typeof SERVICES)[0] }) => {
  const { icon, title, description } = service;

  return (
    <Card variant={"outline"}>
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Image src={icon} alt={title} width={16} />
        <Heading as={"h2"} fontSize={"2xl"} mt={6}>
          {title}
        </Heading>
        <Text align={"center"} maxW={"80%"}>
          {description}
        </Text>
      </CardBody>
    </Card>
  );
};

const CustomListItem = ({
  item,
}: {
  item: {
    id: number;
    label: string;
  };
}) => {
  const { label } = item;
  return (
    <ListItem>
      <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
      {label}
    </ListItem>
  );
};

const AboutUs = () => {
  const { data: statsData } = useStats();
  const data = statsData ? statsData?.dashboard : [];
  const yearsSince = getYearsSince("2014-01-26");

  return (
    <>
      <Wrapper py={28}>
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
            <VStack
              display={{ base: "none", lg: "flex" }}
              divider={<StackDivider borderColor={colors.gray} />}
              spacing={4}
            >
              <VStack flex={1} spacing={4}>
                <Text
                  position={"relative"}
                  fontSize={"5xl"}
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
                  {yearsSince}
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  Years of <br /> Establishment
                </Text>
              </VStack>

              <VStack flex={1} spacing={0}>
                <Text
                  position={"relative"}
                  fontSize={"5xl"}
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
                  {data[1]?.quantity}
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  {data[1]?.title}
                </Text>
              </VStack>

              <VStack flex={1} spacing={0}>
                <Text
                  position={"relative"}
                  fontSize={"5xl"}
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
                  {data[2]?.quantity}
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  {data[2]?.title}
                </Text>
              </VStack>

              <VStack flex={1} spacing={0}>
                <Text
                  position={"relative"}
                  fontSize={"5xl"}
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
                  {data[3]?.quantity}
                </Text>
                <Text fontSize={"2xl"} align={"center"}>
                  {data[3]?.title}
                </Text>
              </VStack>
            </VStack>

            <VStack
              flex={1}
              spacing={8}
              align={"start"}
              px={4}
              // textAlign={{ base: "center", lg: "start" }}
            >
              <Heading>Few Words About Us</Heading>
              <Text lineHeight={"2rem"} fontSize={"lg"}>
                Safai is a pioneering company established in BS 2070,
                specializing in Recyclable and Reusable solid waste management,
                Located in Madhyapur-3 Bhatapur. With a strong commitment to
                excellence and sustainability.
              </Text>
              <Text lineHeight={"2rem"} fontSize={"lg"}>
                Safai is dedicated to reduce the solid waste are being dumped to
                dumping site and create awareness to our society of the waste
                management. Our team of skilled professionals is driven by a
                passion for innovation and a desire to create a positive impact
                on the environment. At Safai, we strive to be a leader in our
                field, constantly seeking new ways to improve and innovate. With
                a focus on research and development, we are always looking for
                new technologies and methodologies to enhance our services and
                deliver the best possible results to our society and
                environment. Our mission is to promote 3R whereas Reduce the
                waste or scrap are being emitted, Re-use the waste or scrap are
                being emitted and Recycle the waste or scrap are being emitted
                by human, While promoting environmental sustainability and
                social responsibility. With a firm belief in the power of
                collaboration and innovation, we are committed to building a
                better future for generations to come.
              </Text>
              <Text lineHeight={"2rem"} fontSize={"lg"}>
                Our mission is to promote 3R whereas Reduce the waste or scrap
                are being emitted, Re-use the waste or scrap are being emitted
                and Recycle the waste or scrap are being emitted by human, While
                promoting environmental sustainability and social
                responsibility. With a firm belief in the power of collaboration
                and innovation, we are committed to building a better future for
                generations to come.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
      <Box as={"section"} py={24} position={"relative"} w={"100%"}>
        <Container px={4}>
          <Heading textAlign={"center"}>Services</Heading>
          <Text textAlign={"center"} fontSize={"lg"}>
            For the outcome of our mission we provide a range of services to our
            clients
          </Text>
          <SimpleGrid
            mt={12}
            templateColumns={{
              base: "repeat(auto-fit, minmax(200px, 1fr))",
              lg: "repeat(2, 1fr)",
            }}
            gap={4}
          >
            {SERVICES.map(service => (
              <Service key={service.title} service={service} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box
        as={"section"}
        py={{ base: 12, lg: 24 }}
        position={"relative"}
        bgColor={colors.gray_200}
      >
        <Container px={6}>
          <Flex gap={10} direction={{ base: "column", lg: "row" }}>
            <Box w={{ base: "60%", lg: "40%" }} mx={"auto"}>
              <Image src={ThreeR} alt={"recycle"} w={"full"} />
            </Box>
            <Box w={{ lg: "60%" }}>
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
                  {MISSIONS.map(mission => (
                    <CustomListItem key={mission.id} item={mission} />
                  ))}
                </UnorderedList>

                <Text mt={8} fontSize={"xl"} fontWeight={"bold"} mb={4}>
                  Our Vision
                </Text>
                <UnorderedList listStyleType={"none"} spacing={2}>
                  {VISIONS.map(vision => (
                    <CustomListItem key={vision.id} item={vision} />
                  ))}
                </UnorderedList>
              </Box>
            </Box>
          </Flex>
          <Flex mt={16} bgColor={colors.primary} align={"center"} gap={8} p={8}>
            <Text color={colors.white} flex={1} fontSize={"xl"}>
              <span style={{ fontWeight: 700 }}>Our Goal: </span>
              Establish recycle factory for dry solid waste.
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default AboutUs;
