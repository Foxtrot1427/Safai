import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  HStack,
  Image,
  Square,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Carton, Logistics, Recycle } from '@rsces/assets/images';
import Container from '@rsces/components/ui/Container';
import { NAVIGATION_ROUTES } from '@rsces/routes/routes.constant';
import { colors } from '@rsces/theme/colors';
import { IconType } from 'react-icons';
import { BsEnvelope } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { STATISTICS } from '../data';

function renderIcon(icon: IconType) {
  const Icon = icon;
  return <Icon fontSize={60} color={'#aaa'} />;
}

const Home = () => {
  const navigate = useNavigate();

  const navigateToAboutUs = () => {
    navigate(NAVIGATION_ROUTES.ABOUT_US);
  };

  return (
    <>
      {/* Banner */}
      <Box
        as={'section'}
        position={'relative'}
        py={80}
        background={
          'url("https://images.unsplash.com/photo-1618477462041-2b6b1920e073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center'}
        _after={{
          position: 'absolute',
          zIndex: 10,
          top: 0,
          content: '""',
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(to right, ${colors.primary}, transparent)`,
          opacity: 0.5,
        }}
      >
        <Container>
          <Box>
            <Box position={'relative'} zIndex={20}>
              <Text
                textTransform={'uppercase'}
                fontSize={'5xl'}
                fontWeight={'bold'}
                color={colors.white}
              >
                Got Trash?
              </Text>

              <Text maxW={'40%'} mt={4} color={colors.white} fontSize={'xl'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                optio earum quis beatae, tempore tempora nisi, blanditiis sunt
                rerum aliquam labore amet soluta tenetur dolores quas asperiores
                nihil accusantium consequatur?
              </Text>

              <Button
                textTransform={'uppercase'}
                w={'fit-content'}
                mt={6}
                bg={colors.black}
                color={colors.white}
                borderRadius={'none'}
                py={6}
                px={8}
                _hover={{
                  bg: colors.gray_100,
                  color: colors.black,
                }}
              >
                Sell to us
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box as={'section'} py={48}>
        <Container>
          <Flex gap={12}>
            <HStack flex={1}>
              <Box flex={1}>
                <Image
                  src={Carton}
                  alt="Box"
                  height={'300px'}
                  objectFit={'cover'}
                />
              </Box>

              <VStack
                px={6}
                borderRight={`6px solid ${colors.primary}`}
                align={'start'}
                spacing={0}
              >
                <Text fontSize={'5xl'} fontWeight={'bold'}>
                  About
                </Text>
                <Text
                  fontSize={'7xl'}
                  fontWeight={'black'}
                  color={colors.gray}
                  mt={'-24px'}
                >
                  RSCES
                </Text>
              </VStack>
            </HStack>

            <VStack
              flex={1}
              spacing={4}
              align={'normal'}
              justifyContent={'center'}
            >
              <Text lineHeight={'taller'} fontSize={'lg'}>
                Phohor Mohor (Research for Scrap and Civil Engineering Service
                Pvt., Ltd) is a waste management company established in 2070 BS
                with a mission to promote sustainable development by purchasing
                recyclable and reusable waste materials. We aim to reduce waste
                going to landfills and contribute towards a cleaner and greener
                environment. Our team of experts works with households,
                businesses, and industries to collect, sort, and recycle waste
                materials.
              </Text>
              <Button
                mt={4}
                w={'max-content'}
                px={12}
                py={6}
                borderRadius={'none'}
                border={'1px solid'}
                borderColor={colors.gray_200}
                borderTop={`3px solid ${colors.black}`}
                bg={colors.white}
                _hover={{
                  bg: colors.black,
                  color: colors.white,
                  borderColor: colors.black,
                }}
                onClick={navigateToAboutUs}
              >
                Read More
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Box as={'section'} py={8} bgColor={colors.gray_100}>
        <Container>
          <Flex align={'center'} justify={'space-between'}>
            <HStack>
              <BsEnvelope fontSize={48} color={'#aaa'} />
              <HStack flex={1} spacing={4} ml={4}>
                <Text fontSize={'6xl'} fontWeight={'bold'}>
                  4
                </Text>
                <Text fontSize={'2xl'}>
                  Years of <br /> Establishment
                </Text>
              </HStack>
            </HStack>

            {STATISTICS.map((item) => (
              <HStack key={item.id} flex={1} justify={'center'}>
                {renderIcon(item.icon)}
                <VStack spacing={0}>
                  <Text
                    position={'relative'}
                    fontSize={'6xl'}
                    fontWeight={'bold'}
                    _after={{
                      content: `"${item.unit}"`,
                      display: 'inline-block',
                      fontSize: '2xl',
                      position: 'absolute',
                      top: 4,
                      left: '105%',
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <Text fontSize={'2xl'}>{item.material}</Text>
                </VStack>
              </HStack>
            ))}
          </Flex>
        </Container>
      </Box>

      <Tabs isFitted variant="unstyled">
        <Box bgColor={colors.primary} py={4}>
          <Container>
            <HStack as={TabList} divider={<StackDivider />}>
              <Tab
                color={colors.white}
                flexDirection={'column'}
                gap={4}
                position={'relative'}
                _selected={{
                  _after: {
                    content: '""',
                    width: 0,
                    height: 0,
                    borderLeft: '25px solid transparent',
                    borderRight: '25px solid transparent',
                    borderTop: `25px solid ${colors.primary}`,
                    position: 'absolute',
                    bottom: '-40px',
                  },
                }}
              >
                <Image src={Recycle} alt="Recycle" h={24} />
                <Text>Recycle Services</Text>
              </Tab>
              <Tab
                color={colors.white}
                flexDirection={'column'}
                gap={4}
                position={'relative'}
                _selected={{
                  _after: {
                    content: '""',
                    width: 0,
                    height: 0,
                    borderLeft: '25px solid transparent',
                    borderRight: '25px solid transparent',
                    borderTop: `25px solid ${colors.primary}`,
                    position: 'absolute',
                    bottom: '-40px',
                  },
                }}
              >
                <Image src={Logistics} alt="Logistics" h={24} />
                <Text>Logistic Services</Text>
              </Tab>
            </HStack>
          </Container>
        </Box>

        <Container>
          <TabPanels py={8}>
            <TabPanel>
              <Flex>
                {/* Recycle Services Image  */}
                <Box></Box>

                <Box flex={1}>
                  <Text>Recycle Service</Text>

                  <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Iusto at eum nisi harum nulla placeat, dolorum eveniet
                    pariatur, ea deleniti nam reprehenderit dolorem, nemo sequi
                    earum possimus ipsa fugit vel! A ipsa aperiam soluta nisi
                    quasi rem voluptate, officia deserunt perspiciatis
                    laboriosam. Dolor ipsam saepe consectetur inventore
                    accusamus veniam deleniti architecto cum cupiditate nihil
                    iste quae, quod voluptatibus itaque illo.
                  </Text>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex>
                {/* Recycle Services Image  */}
                <Box></Box>

                <Box flex={1}>
                  <Text>Logistic Service</Text>

                  <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Expedita veritatis, recusandae nostrum cumque odit quas
                    vitae, error earum provident ratione dicta quia impedit
                    debitis incidunt doloremque non dolor natus aperiam.
                    Asperiores laudantium, voluptas enim itaque aliquid
                    laboriosam vero unde consectetur, fugiat error nisi nam
                    rerum eligendi modi dolores doloribus officia, facilis esse.
                    Velit sint porro nobis earum blanditiis animi molestiae.
                    Debitis facere enim consequatur minus ipsam sint velit
                    ducimus totam veritatis facilis quisquam alias sunt repellat
                    maxime, cum eaque tempora corrupti excepturi, blanditiis
                    odit doloremque laudantium incidunt? Labore, magni quia?
                  </Text>
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Container>
      </Tabs>

      <Box as={'section'} bgColor={colors.primary} py={24}>
        <Container>
          <Text textTransform={'uppercase'} align={'center'} fontSize={'2xl'}>
            Collecting Trash
          </Text>
          <Text
            textTransform={'uppercase'}
            align={'center'}
            fontSize={'5xl'}
            fontWeight={'bold'}
          >
            How it works
          </Text>

          <Flex mt={24}>
            {[
              { title: 'Bear to Discover', image: '' },
              { title: 'Bear to Discover 2', image: '' },
              { title: 'Bear to Discover 3', image: '' },
              { title: 'Bear to Discover 4', image: '' },
              { title: 'Bear to Discover 5', image: '' },
            ].map((item, index) => (
              <Flex
                flex={1}
                key={item.title}
                flexDir={(index + 1) % 2 === 0 ? 'column-reverse' : 'column'}
                align={'center'}
                gap={6}
                color={colors.white}
              >
                <Flex gap={2} align={'center'}>
                  <Text fontSize={'5xl'} fontWeight={'bold'}>
                    {index + 1}
                  </Text>
                  <Text>{item.title}</Text>
                </Flex>
                <Circle
                  position={'relative'}
                  zIndex={1}
                  size={48}
                  bgColor={'black'}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  _before={{
                    display: index === 4 ? 'none' : 'block',
                    content: '""',
                    width: '100px',
                    height: 0,
                    position: 'relative',
                    border: '4px dashed gray',
                    right: 0,
                    transformOrigin: `100px ${
                      (index + 1) % 2 === 0 ? '260px' : '-260px'
                    }`,
                    transform: `rotate(${
                      (index + 1) % 2 === 0 ? '30deg' : '-30deg'
                    }) translateZ(-1px)`,
                  }}
                  bgImage={
                    "url('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png')"
                  }
                  bgSize={'contain'}
                ></Circle>
              </Flex>
            ))}
          </Flex>
        </Container>
      </Box>

      <Box as="section" py={24}>
        <Container>
          <Text textTransform={'uppercase'} align={'center'} fontSize={'2xl'}>
            What we recycle
          </Text>
          <Text
            textTransform={'uppercase'}
            align={'center'}
            fontSize={'5xl'}
            fontWeight={'bold'}
          >
            What we buy?
          </Text>

          <Grid
            mt={24}
            gridTemplateColumns={'repeat(auto-fit, minmax(250px, 1fr))'}
            gap={8}
            justifyItems={'center'}
          >
            {Array.from(new Array(8)).map((_, index) => (
              <Square size={56} key={index} bgColor={colors.gray_100}></Square>
            ))}
          </Grid>

          <Flex justify={'center'} mt={8}>
            <Button
              bg={colors.primary}
              color={colors.white}
              px={16}
              py={6}
              borderRadius={'none'}
            >
              View All
            </Button>
          </Flex>
        </Container>
      </Box>

      <Box as={'section'} bgColor={colors.gray_100} py={24}>
        <Container>
          <Text textTransform={'uppercase'} fontSize={'2xl'} align={'center'}>
            Who saves environment
          </Text>
          <Text
            textTransform={'uppercase'}
            fontSize={'5xl'}
            align={'center'}
            fontWeight={'bold'}
          >
            Our clients
          </Text>

          <Flex gap={8} justifyContent={'center'} mt={12}>
            {Array.from(new Array(6)).map((_, index) => (
              <Square size={48} key={index} bgColor={colors.gray_700} />
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Home;
