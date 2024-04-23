import {
  Box,
  Button,
  HStack,
  Image,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { Logo } from '@rsces/assets/images/index';
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVBAR_LINKS } from '../../data';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import { ShieldIcon } from '@rsces/assets/icons/Shield';
import { useAuthentication } from '@rsces/service/service-auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: isAdmin } = useAuthentication();

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
            alignItems={'center'}
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
          {isAdmin && (
            <Button
              variant={'ghost'}
              leftIcon={<ShieldIcon />}
              onClick={() => navigate(NAVIGATION_ROUTES.ADMIN_DASHBOARD)}
            >
              Admin
            </Button>
          )}
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
