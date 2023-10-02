import { HStack, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <HStack as="nav" px={16} py={8} justify={'space-between'} boxShadow={'sm'}>
      <Text>LOGO</Text>

      <UnorderedList
        listStyleType={'none'}
        display={'flex'}
        gap={8}
        fontWeight={'semibold'}
      >
        <ListItem>Home</ListItem>
        <ListItem>About Us</ListItem>
        <ListItem>What we buy</ListItem>
        <ListItem>How it works</ListItem>
        <ListItem>Available with us</ListItem>
        <ListItem>Contact</ListItem>
      </UnorderedList>
    </HStack>
  );
};

export default Navbar;
