import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Carton,
  HomeBanner,
  LogisticServices,
  Logistics,
  Recycle,
  RecycleServices,
  RecycledProducts,
  ShopRecycled,
  TrashDonation,
  TrashPickup,
  TrashTransform,
} from "@rsces/assets/images";
import Container from "@rsces/components/ui/Container";
import Wrapper from "@rsces/components/ui/Wrapper";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";
import { useGetAllOrganizations } from "@rsces/service/service-organizations";
import { useStats } from "@rsces/service/service-stats";
import { colors } from "@rsces/theme/colors";
import { BsEnvelope } from "react-icons/bs";
import { FaRecycle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { IoStatsChartOutline } from "react-icons/io5";
import { getYearsSince } from "@rsces/hooks/getYearsSince";

const settings: Settings = {
  dots: true,
  arrows: false,
  infinite: true,
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 3,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const Home = () => {
  const { data: statsData } = useStats();
  const catData = statsData ? statsData?.categories : [];
  const yearsSince = getYearsSince("2014-01-26");
  const navigate = useNavigate();
  const { data: orgData } = useGetAllOrganizations();
  const navigateToAboutUs = () => {
    navigate(NAVIGATION_ROUTES.ABOUT_US, {
      preventScrollReset: false,
    });
  };

  return (
    <>
      {/* Banner */}
      <Wrapper bannerImg={HomeBanner} py={{ base: 24, lg: 64 }}>
        <Container height={24}>
          <Box>
            <Box
              position={"relative"}
              zIndex={20}
              maxW={{ base: "90%", lg: "50%" }}
              mx={{ base: "auto", lg: "unset" }}
            >
              <Text
                textTransform={"uppercase"}
                fontSize={{ base: "3xl", lg: "4xl" }}
                fontWeight={"bold"}
                color={colors.white}
              >
                Uncover Hidden Value of Scraps
              </Text>

              <Text
                mt={4}
                color={colors.white}
                fontSize={{ base: "sm", lg: "lg" }}
                fontWeight={400}
              >
                We specialize in collecting, sorting, and recycling waste to
                promote sustainability and reduce landfill impact. Let us help
                you turn your trash into valuable resources for a greener
                future.
              </Text>

              <Button
                textTransform={"uppercase"}
                w={"fit-content"}
                mt={6}
                bg={colors.primary}
                color={colors.white}
                borderRadius={"none"}
                py={6}
                px={8}
                onClick={() => navigate(NAVIGATION_ROUTES.WHAT_WE_BUY)}
              >
                Sell to us
              </Button>
            </Box>
          </Box>
        </Container>
      </Wrapper>

      <Box as={"section"} py={{ base: 16, lg: 48 }}>
        <Container>
          <Flex gap={12} direction={{ base: "column", lg: "row" }} px={8}>
            <Stack
              flex={1}
              direction={{ base: "column", lg: "row" }}
              alignItems={{ base: "unset", lg: "start" }}
            >
              <Box flex={1}>
                <Image
                  src={Carton}
                  alt="Box"
                  height={"300px"}
                  objectFit={"cover"}
                />
              </Box>

              <VStack
                px={6}
                borderRight={`6px solid ${colors.primary}`}
                align={"start"}
                spacing={0}
              >
                <Text fontSize={"3xl"} fontWeight={"bold"}>
                  About
                </Text>
                <Text
                  fontSize={"4xl"}
                  fontWeight={"black"}
                  color={colors.gray}
                  mt={"-14px"}
                >
                  Phohormohor
                </Text>
              </VStack>
            </Stack>

            <VStack
              flex={1}
              spacing={4}
              align={"normal"}
              justifyContent={"center"}
            >
              <Text lineHeight={"taller"} fontSize={"lg"}>
                Phohor Mohor is a pioneering company established in BS 2070,
                specializing in Recyclable and Reusable solid waste management,
                Located in Madhyapur-3 Bhatapur. With a strong commitment to
                excellence and sustainability, Phohor Mohor is dedicated to
                reduce the solid waste are being dumped to dumping site and
                create awareness to our society of the waste management. Our
                team of skilled professionals is driven by a passion for
                innovation and a desire to create a positive impact on the
                environment.
              </Text>
              <Button
                mt={4}
                w={"max-content"}
                px={12}
                py={6}
                borderRadius={"none"}
                border={"1px solid"}
                borderColor={colors.primary}
                borderTop={`3px solid ${colors.green_300}`}
                bg={colors.white}
                color={colors.black}
                transition={"all 300ms ease"}
                _hover={{
                  background: colors.green_200,
                  color: colors.white,
                  borderColor: colors.primary,
                }}
                onClick={navigateToAboutUs}
              >
                Read More
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Box as={"section"} py={8} bgColor={colors.gray_100}>
        <Container>
          <Stack
            align={"center"}
            justify={"space-between"}
            direction={{ base: "column", lg: "row" }}
            gap={16}
            divider={
              <StackDivider
                display={{ base: "flex", lg: "none" }}
                border={"1px solid"}
                borderColor={"gray.300"}
              />
            }
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              alignItems={"center"}
            >
              <BsEnvelope fontSize={48} color={"#aaa"} />
              <Stack
                flex={1}
                ml={4}
                gap={{ base: 4, lg: 0 }}
                align={{ base: "center", lg: "unset" }}
                direction={{ base: "row", lg: "column" }}
              >
                <Text fontSize={"4xl"} fontWeight={"bold"}>
                  {yearsSince}
                </Text>
                <Text fontSize={"2xl"}>Years of Establishment</Text>
              </Stack>
            </Stack>
            <Box
              position={"relative"}
              height={"full"}
              width={"full"}
              overflow={"hidden"}
            >
              <Slider {...settings}>
                {catData?.map(item => (
                  <Stack
                    key={item.id}
                    flex={1}
                    justify={"center"}
                    direction={{ base: "column", lg: "row" }}
                    pb={8}
                    alignItems={"center"}
                  >
                    <IoStatsChartOutline fontSize={24} color={"#aaa"} />
                    <VStack align={"center"} ml={4}>
                      <Text fontSize={"4xl"} fontWeight={"bold"}>
                        {item.donation}
                      </Text>
                      <Text fontSize={"2xl"}>{item.name}</Text>
                    </VStack>
                  </Stack>
                ))}
              </Slider>
            </Box>
            <Stack
              direction={{ base: "column", lg: "row" }}
              alignItems={"center"}
            >
              <FaRecycle fontSize={48} color={"#aaa"} />
              <Stack
                flex={1}
                ml={4}
                gap={{ base: 4, lg: 0 }}
                align={{ base: "center", lg: "unset" }}
                direction={{ base: "row", lg: "column" }}
              >
                <Text fontSize={"4xl"} fontWeight={"bold"}>
                  {statsData?.totalDonation}
                </Text>
                <Text fontSize={"2xl"}>Total collection</Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Tabs isFitted variant="unstyled">
        <Box bgColor={colors.primary} py={4}>
          <Container>
            <HStack as={TabList} divider={<StackDivider />}>
              <Tab
                color={colors.white}
                flexDirection={"column"}
                gap={4}
                position={"relative"}
                _selected={{
                  _after: {
                    content: '""',
                    width: 0,
                    height: 0,
                    borderLeft: "25px solid transparent",
                    borderRight: "25px solid transparent",
                    borderTop: `25px solid ${colors.primary}`,
                    position: "absolute",
                    bottom: "-40px",
                  },
                }}
              >
                <Image src={Recycle} alt="Recycle" h={{ base: 12, lg: 24 }} />
                <Text>Recycle Services</Text>
              </Tab>
              <Tab
                color={colors.white}
                flexDirection={"column"}
                gap={4}
                position={"relative"}
                _selected={{
                  _after: {
                    content: '""',
                    width: 0,
                    height: 0,
                    borderLeft: "25px solid transparent",
                    borderRight: "25px solid transparent",
                    borderTop: `25px solid ${colors.primary}`,
                    position: "absolute",
                    bottom: "-40px",
                  },
                }}
              >
                <Image
                  src={Logistics}
                  alt="Logistics"
                  h={{ base: 12, lg: 24 }}
                />
                <Text>Logistic Services</Text>
              </Tab>
            </HStack>
          </Container>
        </Box>

        <Container>
          <TabPanels py={{ base: 12, lg: 24 }}>
            <TabPanel>
              <Box>
                <Box>
                  <Image
                    src={RecycleServices}
                    alt="Recycle Services"
                    w={"400px"}
                    aspectRatio={4 / 3}
                    objectFit={"cover"}
                    objectPosition={"center"}
                    borderRadius={"10%"}
                    float={"right"}
                    ml={8}
                    mb={8}
                  />
                </Box>

                <Box flex={1}>
                  <Text fontWeight={600} fontSize={"2xl"}>
                    Recycle Service
                  </Text>

                  <Text mt={4} lineHeight={"1.75rem"}>
                    At Phohor Mohor, our Recycle Services are at the heart of
                    our mission to promote environmental sustainability and
                    social responsibility. We take pride in our meticulous waste
                    sorting process, where we categorize waste materials such as
                    plastic, paper, rubber, metal, used oil, mobil, shoes,
                    clothes, and glass. By collaborating with trusted recycling
                    facilities, we ensure that each material is processed
                    responsibly, transforming waste into valuable resources. Our
                    in-house recycling of plastic materials exemplifies our
                    commitment to innovation, turning discarded plastic into
                    useful products that contribute to a circular economy.
                    Through these efforts, we significantly reduce the volume of
                    waste heading to landfills, fostering a cleaner, greener
                    environment for future generations.
                  </Text>
                  <Text mt={4} lineHeight={"1.75rem"}>
                    Our comprehensive recycling services extend beyond waste
                    processing. We work closely with businesses, industries, and
                    institutions to provide expert consulting on sustainable
                    waste management practices. Our team of skilled
                    professionals offers tailored advice on waste reduction
                    strategies, helping our clients minimize their environmental
                    impact and achieve their sustainability goals. By raising
                    awareness and encouraging the adoption of responsible waste
                    management practices, we strive to create a positive ripple
                    effect that benefits both society and the environment. At
                    Phohor Mohor, we believe that every effort counts, and our
                    recycling services are designed to make a meaningful
                    difference in the pursuit of a sustainable future.
                  </Text>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <Box>
                  <Image
                    src={LogisticServices}
                    alt="Logistic Services"
                    w={"400px"}
                    aspectRatio={4 / 3}
                    objectFit={"cover"}
                    objectPosition={"center"}
                    borderRadius={"10%"}
                    float={"right"}
                    ml={8}
                    mb={8}
                  />
                </Box>

                <Box flex={1}>
                  <Text fontWeight={600} fontSize={"2xl"}>
                    Logistic Service
                  </Text>

                  <Text mt={4} lineHeight={"1.75rem"}>
                    Phohor Mohor's Logistic Services are designed to ensure the
                    efficient and safe collection of recyclable and reusable
                    waste materials from various sources, including households,
                    businesses, industries, institutions, and social
                    organizations. Our team utilizes specialized equipment and
                    vehicles to handle waste collection with precision and care,
                    ensuring that the materials are transported securely to our
                    sorting and recycling facilities. By streamlining the
                    logistics of waste management, we provide a reliable and
                    convenient solution for our clients, making it easy for them
                    to contribute to environmental sustainability.
                  </Text>

                  <Text mt={4} lineHeight={"1.75rem"}>
                    Our logistics expertise goes beyond collection. We offer
                    tailored waste management solutions that cater to the unique
                    needs of each client, ensuring that their waste is handled
                    in the most sustainable manner possible. Our consulting
                    services provide businesses and industries with actionable
                    insights on reducing waste generation and optimizing their
                    waste management processes. By integrating advanced
                    technologies and methodologies, we continuously seek to
                    enhance our logistic operations, delivering top-notch
                    services that align with our mission to promote sustainable
                    development. At Phohor Mohor, we are committed to building a
                    cleaner, greener future through efficient and innovative
                    waste management logistics.
                  </Text>
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Container>
      </Tabs>

      <Box as={"section"} bgColor={colors.primary} py={{ base: 12, lg: 24 }}>
        <Container>
          <Text textTransform={"uppercase"} align={"center"} fontSize={"2xl"}>
            Collecting Trash
          </Text>
          <Text
            textTransform={"uppercase"}
            align={"center"}
            fontSize={"5xl"}
            fontWeight={"bold"}
          >
            How it works
          </Text>

          <Flex
            mt={{ base: 12, lg: 24 }}
            direction={{ base: "column", lg: "row" }}
            gap={8}
          >
            {[
              {
                title: "Sell Your Trash",
                description:
                  "Shape a sustainable tomorrow with your recyclables.",
                image: TrashDonation,
              },
              {
                title: "Waste Warriors at Your Doorstep",
                description:
                  "Effortless recycling with prompt doorstep pickups",
                image: TrashPickup,
              },
              {
                title: "Transforming Trash into Treasure",
                description:
                  "Experience the magic of turning waste into renewed materials.",
                image: TrashTransform,
              },
              {
                title: "From Recycled to Remarkable",
                description:
                  "Explore unique, high-quality products crafted from your donated materials",
                image: RecycledProducts,
              },
              {
                title: "Shop the Change",
                description:
                  "Contribute to a cleaner planet by purchasing from our recycled product range",
                image: ShopRecycled,
              },
            ].map((item, index) => (
              <>
                <Flex
                  display={{ base: "none", lg: "flex" }}
                  flex={1}
                  key={item.title}
                  flexDir={(index + 1) % 2 === 0 ? "column-reverse" : "column"}
                  align={"center"}
                  gap={6}
                  color={colors.gray_200}
                >
                  <Flex gap={2}>
                    <Text fontSize={"5xl"} fontWeight={"bold"} mt={-3}>
                      {index + 1}
                    </Text>
                    <VStack align={"start"}>
                      <Text fontWeight={700} fontSize={"lg"}>
                        {item.title}
                      </Text>
                      <Text>{item.description}</Text>
                    </VStack>
                  </Flex>
                  <Circle
                    position={"relative"}
                    zIndex={1}
                    size={48}
                    bgColor={"black"}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    _before={{
                      display: index >= 4 ? "none" : "block",
                      content: '""',
                      width: "280px",
                      height: 0,
                      position: "relative",
                      border: "4px dashed",
                      borderColor: "gray.300",
                      right: 0,
                      transformOrigin: `100px ${
                        (index + 1) % 2 === 0 ? "140px" : "-140px"
                      }`,
                      transform: `rotate(${
                        (index + 1) % 2 === 0 ? "40deg" : "-40deg"
                      }) translateZ(-1px)`,
                    }}
                    bgImage={item.image}
                    bgSize={"cover"}
                  />
                </Flex>
                <Flex
                  direction={"column"}
                  align={"center"}
                  gap={4}
                  color={"white"}
                  display={{ base: "flex", lg: "none" }}
                >
                  <Circle
                    position={"relative"}
                    zIndex={1}
                    size={48}
                    bgColor={"black"}
                    bgImage={item.image}
                    bgSize={"cover"}
                  />
                  <Flex gap={2} maxW={"70%"}>
                    <Text fontSize={"5xl"} fontWeight={"bold"} mt={-3}>
                      {index + 1}
                    </Text>
                    <VStack align={"start"}>
                      <Text fontWeight={700} fontSize={"lg"}>
                        {item.title}
                      </Text>
                      <Text>{item.description}</Text>
                    </VStack>
                  </Flex>
                </Flex>
              </>
            ))}
          </Flex>
        </Container>
      </Box>

      <Box as={"section"} bgColor={colors.gray_100} py={24}>
        <Container>
          <Text textTransform={"uppercase"} fontSize={"2xl"} align={"center"}>
            Who saves environment
          </Text>
          <Text
            textTransform={"uppercase"}
            fontSize={"5xl"}
            align={"center"}
            fontWeight={"bold"}
          >
            Our clients
          </Text>

          <Grid
            templateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
            justifyItems={"center"}
            gap={8}
            mt={12}
          >
            {orgData?.map(item => (
              <VStack>
                <Image
                  key={item?.id}
                  src={item?.image}
                  alt={item?.name}
                  h={48}
                />
                <Text>{item?.name}</Text>
                <Text>
                  Total Contribution:{" "}
                  {item?.contribution ? item?.contribution?.toFixed(2) : "0"}%
                </Text>
                {/* <Text>Total Collection: {item?.total}</Text> */}
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
