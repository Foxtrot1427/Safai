import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "@rsces/assets/images/index";
import Container from "@rsces/components/ui/Container";
import { colors } from "@rsces/theme/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAVBAR_LINKS } from "../../data";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";
import { ShieldIcon } from "@rsces/assets/icons/Shield";
import { useAuthentication } from "@rsces/service/service-auth";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: isAdmin } = useAuthentication();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Box
      borderBottom={"1px solid"}
      borderColor={colors.gray_200}
      boxShadow={"sm"}
    >
      <Container>
        <HStack w={"full"} py={4} justify={"space-between"} px={2}>
          <Image
            src={Logo}
            alt="Logo"
            height={"64px"}
            objectFit={"contain"}
            cursor={"pointer"}
            onClick={() => navigate(NAVIGATION_ROUTES.BASE)}
          />
          {/* Desktop */}
          <Flex gap={4} display={{ base: "none", lg: "flex" }}>
            <UnorderedList
              listStyleType={"none"}
              alignItems={"center"}
              gap={8}
              fontWeight={"semibold"}
              display={"flex"}
            >
              {NAVBAR_LINKS.map(item => (
                <ListItem
                  key={item.title}
                  _hover={{ color: colors.primary }}
                  color={pathname === item.to ? colors.primary : ""}
                  cursor={"pointer"}
                >
                  <Link to={item.to}>{item.title}</Link>
                </ListItem>
              ))}
            </UnorderedList>
            {isAdmin && (
              <Button
                variant={"ghost"}
                leftIcon={<ShieldIcon />}
                onClick={() => navigate(NAVIGATION_ROUTES.ADMIN_DASHBOARD)}
              >
                Admin
              </Button>
            )}
          </Flex>

          {/* Mobile */}
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant={"unstyled"}
            onClick={onOpen}
            display={{ base: "flex", lg: "none" }}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size={"full"}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody mt={16}>
                <UnorderedList
                  listStyleType={"none"}
                  display={{ base: "flex", lg: "none" }}
                  flexDirection={"column"}
                  gap={8}
                  alignItems={"center"}
                  fontWeight={"semibold"}
                >
                  {NAVBAR_LINKS.map(item => (
                    <ListItem
                      key={item.title}
                      _hover={{ color: "green.400" }}
                      color={pathname === item.to ? "green.400" : ""}
                      cursor={"pointer"}
                    >
                      <Link to={item.to} onClick={onClose}>
                        {item.title}
                      </Link>
                    </ListItem>
                  ))}
                  {isAdmin && (
                    <Button
                      variant={"ghost"}
                      leftIcon={<ShieldIcon />}
                      onClick={() =>
                        navigate(NAVIGATION_ROUTES.ADMIN_DASHBOARD)
                      }
                    >
                      Admin
                    </Button>
                  )}
                </UnorderedList>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
