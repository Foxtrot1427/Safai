import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Link,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { DonationIcon } from '@rsces/assets/icons/Donation';
import { ProductsIcon } from '@rsces/assets/icons/Products';
import Logo from '@rsces/assets/images/logo.png';
import MiniLogo from '@rsces/assets/images/mini-logo.png';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import { colors } from '@rsces/theme/colors';
import React, { Fragment, useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { LuMailQuestion } from 'react-icons/lu';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface CommonSidebarItemProps {
  label: string;
  link?: string;
  icon: React.ReactNode;
  extraHorizontalPadding?: number;
  verticalPadding?: number;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface SidebarItemProps extends CommonSidebarItemProps {
  subItems?: Array<CommonSidebarItemProps>;
}

const options = [
  {
    label: 'Donations',
    icon: <DonationIcon />,
    link: NAVIGATION_ROUTES.ADMIN_DONATIONS,
  },
  {
    label: 'Products',
    icon: <ProductsIcon />,
    link: NAVIGATION_ROUTES.ADMIN_PRODUCTS,
  },
  {
    label: 'Register',
    icon: <LuMailQuestion size={20} />,
    link: NAVIGATION_ROUTES.ADMIN_REGISTER,
  },
  {
    label: 'Settings',
    icon: <FiSettings size={20} />,
    link: '/admin/settings',
  },
];

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {
    icon,
    label,
    subItems,
    extraHorizontalPadding = 0,
    verticalPadding = 16,
    isOpen,
    onToggle,
    link,
  } = props;
  const location = useLocation();
  const isSelected = location.pathname === link;

  return (
    <AccordionItem border="none" gap={0}>
      <Tooltip
        hasArrow
        placement="right"
        label={!isOpen ? label : ''}
        openDelay={200}
        fontSize={13}
      >
        <AccordionButton
          fontSize={13}
          fontWeight={500}
          transition="padding 0.3s ease"
          padding={`${isOpen ? verticalPadding : 16}px ${
            26 + (isOpen ? extraHorizontalPadding : 0)
          }px`}
          justifyContent="space-between"
          _hover={{ background: colors.gray_100 }}
          display={{
            base: 'flex',
            md: !isOpen && subItems ? 'none' : 'flex',
          }}
          bg={isSelected ? colors.gray_100 : 'transparent'}
        >
          <Flex gap={8} alignItems={'flex-end'}>
            <Box flexShrink={0}>{icon}</Box>
            <Text
              isTruncated
              visibility={isOpen ? 'visible' : 'hidden'}
              fontSize={'sm'}
              fontWeight={600}
            >
              {label}
            </Text>
          </Flex>

          {subItems && isOpen && <AccordionIcon />}
        </AccordionButton>
      </Tooltip>

      {subItems && (
        <AccordionPanel p={0}>
          {subItems.map((subItem: SidebarItemProps, index: number) => (
            <SidebarItemContainer
              key={index}
              {...subItem}
              isOpen={isOpen}
              onToggle={onToggle}
              extraHorizontalPadding={14}
              verticalPadding={12}
            />
          ))}
        </AccordionPanel>
      )}
    </AccordionItem>
  );
};

const SidebarItemContainer: React.FC<SidebarItemProps> = (props) => {
  const { link, isOpen, onToggle } = props;

  if (link) {
    return (
      <Link
        as={ReactRouterLink}
        _hover={{}}
        to={link}
        onClick={
          window.location.pathname !== link &&
          window.innerWidth < 1024 &&
          isOpen
            ? onToggle
            : () => false
        }
      >
        <SidebarItem {...props} />
      </Link>
    );
  }

  return <SidebarItem {...props} />;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [openIndexes, setOpenIndexes] = useState<number | number[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Fragment>
      <VStack
        flexShrink={0}
        gap={0}
        transition="width 0.3s ease"
        width={{
          base: isOpen ? 280 : 0,
          lg: isOpen ? 280 : '72px',
        }}
        position={{
          base: 'absolute',
          lg: 'relative',
        }}
        zIndex={50}
        background="white"
        minHeight="100vh"
        height="full"
        overflowX="hidden"
        overflowY="auto"
        boxShadow={'2px 0 4px rgba(0, 0, 0, 0.1)'}
      >
        <Flex
          alignItems="center"
          justifyContent={isOpen ? 'flex-start' : 'center'}
          width="full"
          height={73}
          flexShrink={0}
          px={isOpen ? 7 : 2}
          pt={2}
          boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.1)'}
        >
          <Link
            as={ReactRouterLink}
            to={'/'}
            display={{
              base: 'block',
              lg: isOpen ? 'block' : 'none',
            }}
            flexShrink={0}
          >
            <Image src={Logo} alt="Logo" height={12} />
          </Link>
          <Link
            as={ReactRouterLink}
            to={'/'}
            display={{
              lg: !isOpen ? 'block' : 'none',
            }}
          >
            <Image src={MiniLogo} alt="Logo" height={6} />
          </Link>
        </Flex>

        <Accordion
          allowMultiple
          width="full"
          fontSize={14}
          py={2}
          onChange={setOpenIndexes}
          index={
            isOpen || isSmallScreen
              ? openIndexes
              : Array(options.length + 20)
                  .fill('')
                  .map((_, index) => index)
          }
        >
          {options.map((option, index) => (
            <SidebarItemContainer
              key={index}
              {...option}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          ))}
        </Accordion>
      </VStack>

      <Flex
        background="black"
        width="full"
        minHeight="100vh"
        position="fixed"
        transition="opacity 0.3s ease, visibility 0.3s ease"
        display={{
          lg: 'none',
        }}
        visibility={isOpen ? 'visible' : 'hidden'}
        opacity={isOpen ? 0.4 : 0}
        zIndex={40}
        left={0}
        top={0}
        onClick={onToggle}
        border="1px solid"
      ></Flex>
    </Fragment>
  );
};

export default Sidebar;
