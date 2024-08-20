import {
  Box,
  Link as ChakraUILink,
  Divider,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Container from "@rsces/components/ui/Container";
import { colors } from "@rsces/theme/colors";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../../data";

const Footer = () => {
  const openLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.open("https://www.pitechnologynepal.com/", "_blank");
  };
  return (
    <Box as={"footer"} bg={colors.footer_bg} color={colors.white}>
      <Container>
        <VStack py={8} spacing={8} align={"normal"}>
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 8, lg: 0 }}
          >
            <Text
              flex={1}
              align={"center"}
              fontSize={"xl"}
              variant={"heading"}
              pt={{ base: 0, lg: 8 }}
            >
              Research and Recycle<br></br> of <br></br> Scraps Pvt Ltd.
            </Text>

            <VStack flex={1}>
              <Text casing={"uppercase"} fontSize={"lg"} fontWeight={700}>
                Quick Links
              </Text>

              <UnorderedList
                listStyleType={"none"}
                color={colors.gray}
                spacing={2}
                mt={2}
              >
                {FOOTER_LINKS.map(item => (
                  <ListItem
                    key={item.title}
                    textTransform={"uppercase"}
                    fontSize={"sm"}
                    letterSpacing={0.5}
                    textAlign={{ base: "center", lg: "start" }}
                  >
                    <Link to={item.to}>{item.title}</Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </VStack>

            <VStack flex={1}>
              <Text casing={"uppercase"} fontSize={"lg"} fontWeight={700}>
                Contact Location
              </Text>

              <Text mt={2} w={"50%"} align={"center"} lineHeight={"tall"}>
                Research and Recycle of Scraps Pvt Ltd.
                <br></br>
                (Research For Scrap & Civil Engineering P.V.T LTD)
              </Text>

              <Text mt={2} color={colors.gray} fontSize={"sm"}>
                Suryabinayak, Bhaktapur
              </Text>

              <HStack mt={6} spacing={4}>
                <a
                  href="https://www.facebook.com/phohormohor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF fontSize={24} />
                </a>
                <a
                  href="https://www.instagram.com/phohor_mohor?utm_source=ig_web_button_share_sheet&ig
sh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram fontSize={24} />
                </a>
              </HStack>
            </VStack>
          </Stack>

          <Divider />

          <HStack justify={"space-between"} px={4}>
            <Text>RSCES &copy; 2018 | All Rights Reserved</Text>
            <Text>
              Technology Partner:{" "}
              <ChakraUILink onClick={openLink} textDecoration={"underline"}>
                PI Technology{" "}
              </ChakraUILink>
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
