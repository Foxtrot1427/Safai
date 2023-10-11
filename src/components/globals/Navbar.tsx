import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HStack, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import Container from '@rsces/components/ui/Container';

const NAVBAR_ITEMS = [
  { title: 'Home', to: NAVIGATION_ROUTES.BASE },
  { title: 'About Us', to: NAVIGATION_ROUTES.ABOUT_US },
  { title: 'What we buy', to: NAVIGATION_ROUTES.WHAT_WE_BUY },
  { title: 'How it works', to: NAVIGATION_ROUTES.HOW_IT_WORKS },
  { title: 'Available with us', to: NAVIGATION_ROUTES.AVAILABLE_WITH_US },
  { title: 'Contact', to: NAVIGATION_ROUTES.CONTACT },
];

const Navbar = () => {
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  const handleChangeRoute = (to: string) => {
    setCurrentRoute(to);
  };

  return (
    <Container>
      <HStack w={'full'} py={8} justify={'space-between'}>
        <Text>LOGO</Text>

        <UnorderedList
          listStyleType={'none'}
          display={'flex'}
          gap={8}
          fontWeight={'semibold'}
          cursor={'pointer'}
        >
          {NAVBAR_ITEMS.map((item) => (
            <ListItem
              key={item.title}
              _hover={{ color: 'green.400' }}
              color={currentRoute === item.to ? 'green.400' : ''}
              onClick={() => handleChangeRoute(item.to)}
            >
              <Link to={item.to}>{item.title}</Link>
            </ListItem>
          ))}
        </UnorderedList>
      </HStack>
    </Container>
  );
};

export default Navbar;
