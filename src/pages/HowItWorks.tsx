import { Box, Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import Container from "@rsces/components/ui/Container";
import Wrapper from "@rsces/components/ui/Wrapper";
import { colors } from "@rsces/theme/colors";
import { HOW_IT_WORKS_STEPS } from "../../src/data";

const DesktopSeparator = () => {
  return (
    <Box
      width={"4px"}
      bgGradient={`linear(to-b, ${colors.primary} 60%, white)`}
      position={"relative"}
      display={{ base: "none", lg: "block" }}
    >
      <Box
        position={"absolute"}
        top={0}
        left={"50%"}
        transform={"translate(-50%, 0)"}
        width={"20px"}
        height={"20px"}
        background={colors.primary}
        borderRadius={"full"}
      >
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          borderRadius={"full"}
          width={"10px"}
          height={"10px"}
          background={"white"}
        />
      </Box>
    </Box>
  );
};

const MobileSeparator = () => {
  return (
    <Box
      width={"100%"}
      height={"4px"}
      bgGradient={`linear(to-r, white, ${colors.primary} 60%, white)`}
      position={"relative"}
      display={{ base: "block", lg: "none" }}
      mt={8}
    >
      <Box
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        width={"20px"}
        height={"20px"}
        background={colors.primary}
        borderRadius={"full"}
      >
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          borderRadius={"full"}
          width={"10px"}
          height={"10px"}
          background={"white"}
        />
      </Box>
    </Box>
  );
};

interface StepProps extends FlexProps {
  step: number;
  image: string;
  title: string;
  description: string;
}

const Step = ({ step, image, title, description, ...props }: StepProps) => {
  return (
    <Flex gap={{ base: 0, lg: 8 }} {...props}>
      <Flex flex={1} justify={"center"} align={"center"}>
        <Image
          src={image}
          alt={title}
          height={{ base: "350px", lg: "450px" }}
          aspectRatio={1}
          borderRadius={"24px"}
          objectFit={"cover"}
        />
      </Flex>
      <DesktopSeparator />
      <Flex flex={1} direction={"column"} gap={2} mt={10} px={6}>
        <Text
          textTransform={"uppercase"}
          fontSize={"lg"}
          color={"green.500"}
          fontWeight={700}
          fontFamily={"monospace"}
        >
          Step {step}
        </Text>
        <Heading
          fontSize={"xl"}
          fontFamily={"monospace"}
          letterSpacing={"-0.5px"}
        >
          {title}
        </Heading>
        <Text
          fontFamily={"monospace"}
          fontSize={"sm"}
          lineHeight={"1.5rem"}
          // textAlign={{ base: "justify", lg: "start" }}
        >
          {description}
        </Text>
      </Flex>
      <MobileSeparator />
    </Flex>
  );
};

const HowItWorks = () => {
  return (
    <>
      <Wrapper py={28}>
        <Text textTransform={"uppercase"} align={"center"} fontSize={"2xl"}>
          Get to know about us
        </Text>
        <Text align={"center"} fontWeight={700} fontSize={"5xl"}>
          HOW IT WORKS
        </Text>
      </Wrapper>
      <Container my={8} py={{ base: 12, lg: 24 }}>
        <Flex direction={"column"} gap={16}>
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <Step
              key={item.title}
              step={index + 1}
              title={item.title}
              image={item.image}
              description={item.description}
              flexDirection={{
                base: "column",
                lg: (index + 1) % 2 === 0 ? "row-reverse" : "row",
              }}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default HowItWorks;
