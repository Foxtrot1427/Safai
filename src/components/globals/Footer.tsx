import {
  Divider,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { colors } from '../../theme/colors';

const Footer = () => {
  return (
    <VStack
      bg={colors.footer_bg}
      color={colors.white}
      px={16}
      py={8}
      spacing={4}
      align={'normal'}
    >
      <HStack>
        <Text flex={1} align={'center'} fontSize={'xl'} fontWeight={700}>
          Research For Scrab & Civil Engineering P.V.T LTD
        </Text>

        <VStack flex={1}>
          <Text casing={'uppercase'} fontSize={'lg'} fontWeight={700}>
            Quick Links
          </Text>

          <UnorderedList listStyleType={'none'} color={colors.gray} spacing={2}>
            <ListItem>About Company</ListItem>
            <ListItem>What we buy</ListItem>
            <ListItem>How it works</ListItem>
            <ListItem>Available with us</ListItem>
            <ListItem>Contact us</ListItem>
          </UnorderedList>
        </VStack>

        <VStack flex={1}>
          <Text casing={'uppercase'} fontSize={'lg'} fontWeight={700}>
            Contact Location
          </Text>

          <Text>Research For Scrab & Civil Engineering P.V.T LTD</Text>

          <Text>Lorem Ipsum-3 Kausaltar, Bhaktapur</Text>

          <HStack>
            <Text>FB</Text>
            <Text>IG</Text>
            <Text>X</Text>
          </HStack>
        </VStack>
      </HStack>

      <Divider />

      <HStack justify={'space-between'}>
        <Text>RSCES &copy; 2018 | All Rights Reserved</Text>
        <Text>Technology Partner</Text>
      </HStack>
    </VStack>
  );
};

export default Footer;
