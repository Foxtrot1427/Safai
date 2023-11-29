import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

interface NavbarProps {
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggle }) => {
  const navigate = useNavigate();

  const adminName = "Admin";

  return (
    <Flex
      height={73}
      padding={{
        base: 5,
        xl: "0 22px 0 35px",
      }}
      background="white"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box cursor="pointer" onClick={onToggle}>
        <HamburgerIcon boxSize={5} />
      </Box>

      <Menu>
        <MenuButton as={"button"} display="flex">
          <HStack>
            <Text fontWeight={500}>{adminName}</Text>
            <Avatar
              h={9}
              w={9}
              name={adminName}
              boxShadow={"0px 19px 50px rgba(17, 27, 40, 0.3)"}
            />
            <ChevronDownIcon ml={-2} />
            <Heading
              as={"h6"}
              fontSize={{ base: "12px", xl: "16px" }}
            ></Heading>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Actions">
            <MenuItem
              p={3}
              onClick={() => {
                localStorage.clear();
                // logoutUser();
                navigate("/admin-login");
              }}
            >
              <HStack spacing={2}>
                <CloseIcon />
                <Text>Log out</Text>
              </HStack>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
