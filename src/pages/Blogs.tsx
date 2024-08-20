import {
  Box,
  Container,
  Heading,
  IconButton,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TrashCollection } from "@rsces/assets/images";
import Wrapper from "@rsces/components/ui/Wrapper";
import { useBlogs } from "@rsces/service/service-blogs";
import { colors } from "@rsces/theme/colors";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Settings for the slider
const settings: Settings = {
  dots: true,
  arrows: false,
  infinite: true,
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 3,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
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

export default function CaptionCarousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const top = useBreakpointValue({ base: "85%", md: "50%" });
  const transform = useBreakpointValue({
    base: "translate(-250%, -150%)",
    md: "translate(0%, -50%)",
  });

  const { data: blogsData, isLoading } = useBlogs();
  return (
    <>
      <Wrapper bannerImg={TrashCollection} py={28}>
        <Container>
          <Box>
            <Box position={"relative"} zIndex={20} maxW={"50%"}>
              <Text
                textTransform={"uppercase"}
                fontSize={"5xl"}
                fontWeight={"bold"}
                color={colors.white}
              >
                Our Blogs
              </Text>

              <Text
                mt={4}
                color={colors.white}
                fontSize={"xl"}
                fontWeight={400}
              >
                Stay updated with the latest news, tips, and insights on waste
                management, recycling, and sustainability.
              </Text>
            </Box>
          </Box>
        </Container>
      </Wrapper>

      <Box
        position={"relative"}
        height={"600px"}
        width={"full"}
        overflow={"hidden"}
        px={{ base: 5, md: 24 }}
        pt={10}
      >
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={transform}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={{
            base: "translate(250%, -150%)",
            md: "translate(0%, -50%)",
          }}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        <Slider {...settings} ref={c => setSlider(c)}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Box
                  key={index}
                  p={4}
                  boxShadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  background="white"
                  h={"500px"}
                  overflowY={"hidden"}
                >
                  <Skeleton height="300px" borderTopRadius="md" />
                  <VStack align="start" spacing={4} p={4}>
                    <Skeleton height="20px" width="70%" />
                    <Skeleton height="20px" width="50%" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                  </VStack>
                </Box>
              ))
            : blogsData?.map((card, index) => (
                <Box
                  key={index}
                  p={4}
                  boxShadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  background="white"
                  h={"500px"}
                  overflowY={"hidden"}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    borderTopRadius="md"
                    objectFit="cover"
                    width="100%"
                    height="250px"
                  />
                  <VStack align="start" spacing={4} p={4}>
                    <Heading fontSize="2xl">{card.title}</Heading>
                    <Heading fontSize="2xl">
                      {new Date(card.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Heading>{" "}
                    <Text>{card.description}</Text>
                  </VStack>
                </Box>
              ))}
        </Slider>
      </Box>
    </>
  );
}
