import { Box, HStack, Image, ListItem, UnorderedList } from '@chakra-ui/react';
import { Logo } from '@rsces/assets/images/index';
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVBAR_LINKS } from '../../data';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      borderBottom={'1px solid'}
      borderColor={colors.gray_200}
      boxShadow={'sm'}
    >
      <Container>
        <HStack w={'full'} py={4} justify={'space-between'}>
          <Image
            src={Logo}
            alt="Logo"
            height={'64px'}
            objectFit={'contain'}
            cursor={'pointer'}
            onClick={() => navigate(NAVIGATION_ROUTES.BASE)}
          />
          <UnorderedList
            listStyleType={'none'}
            display={'flex'}
            gap={8}
            fontWeight={'semibold'}
          >
            {NAVBAR_LINKS.map((item) => (
              <ListItem
                key={item.title}
                _hover={{ color: 'green.400' }}
                color={pathname === item.to ? 'green.400' : ''}
                cursor={'pointer'}
              >
                <Link to={item.to}>{item.title}</Link>
              </ListItem>
            ))}
          </UnorderedList>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
