import {
  Box,
  Divider,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { colors } from "@rsces/theme/colors";
import Container from "@rsces/components/ui/Container";
import { FOOTER_LINKS } from "../../data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box as={"footer"} bg={colors.footer_bg} color={colors.white}>
      <Container>
        <VStack py={8} spacing={8} align={"normal"}>
          <HStack>
            <Text flex={1} align={"center"} fontSize={"xl"} variant={"heading"}>
              Research For Scrap <br /> & <br />
              Civil Engineering P.V.T LTD
            </Text>

            <VStack flex={1}>
              <Text casing={"uppercase"} fontSize={"lg"} fontWeight={700}>
                Quick Links
              </Text>

              <UnorderedList
                listStyleType={"none"}
                color={colors.gray}
                spacing={2}
                mt={4}
              >
                {FOOTER_LINKS.map(item => (
                  <ListItem
                    key={item.title}
                    textTransform={"uppercase"}
                    fontSize={"sm"}
                    letterSpacing={0.5}
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

              <Text mt={4} w={"50%"} align={"center"} lineHeight={"tall"}>
                Research For Scrab & Civil Engineering P.V.T LTD
              </Text>

              <Text mt={2} color={colors.gray} fontSize={"sm"}>
                Lorem Ipsum-3 Kausaltar, Bhaktapur
              </Text>

              <HStack mt={6} spacing={4}>
                <FaFacebookF fontSize={24} />
                <TfiYoutube fontSize={24} />
                <FaTwitter fontSize={24} />
              </HStack>
            </VStack>
          </HStack>

          <Divider />

          <HStack justify={"space-between"}>
            <Text>RSCES &copy; 2018 | All Rights Reserved</Text>
            <Text>Technology Partner</Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
