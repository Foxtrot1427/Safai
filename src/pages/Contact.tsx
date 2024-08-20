import { Circle, Flex, Image, Text, VStack } from "@chakra-ui/react";
import LocationIcon from "@rsces/assets/icons/location.png";
import SupportIcon from "@rsces/assets/icons/support.png";
import EmailIcon from "@rsces/assets/icons/email.png";
import { colors } from "@rsces/theme/colors";

const Contact = () => {
  return (
    <>
      {/* <Wrapper py={40}>
        <Text textTransform={"uppercase"} fontSize={"2xl"} align={"center"}>
          Our Corporate Location
        </Text>
        <Text
          textTransform={"uppercase"}
          fontSize={"5xl"}
          fontWeight={"bold"}
          align={"center"}  
        >
          Collection Center
        </Text>
      </Wrapper> */}

      <Flex
        w={"60%"}
        mx={"auto"}
        py={24}
        direction={{ base: "column", lg: "row" }}
        gap={8}
      >
        {[
          {
            id: 1,
            icon: LocationIcon,
            link: "https://www.google.com/maps/place/Phohor+Mohor/@27.6696178,85.3590739,17z/data=!3m1!4b1!4m6!3m5!1s0x257d32fd7a78041f:0x41f459c416fc595e!8m2!3d27.6696131!4d85.3639448!16s%2Fg%2F11pvkm9jrr?entry=ttu", // Link to Google Maps
            values: ["Suryabinayak-02", "Balkot, Bhaktapur"],
          },
          {
            id: 2,
            icon: SupportIcon,
            link: "tel:9861813688", // Link to initiate a phone call
            values: ["9861813688, 9841272130", "9840600704"],
          },
          {
            id: 3,
            icon: EmailIcon,
            link: "mailto:rscespvtltd@gmail.com", // Link to open email
            values: ["rscespvtltd@gmail.com"],
          },
        ].map(item => (
          <VStack key={item.id} flex={1}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <Circle
                size={48}
                border={"1px solid"}
                borderColor={colors.primary}
                borderWidth={"2px"}
              >
                <Image src={item.icon} alt="value" width={"30%"} />
              </Circle>
            </a>
            <VStack mt={2} spacing={0}>
              {item.values.map(value => (
                <Text key={value}>{value}</Text>
              ))}
            </VStack>
          </VStack>
        ))}
      </Flex>
    </>
  );
};

export default Contact;
