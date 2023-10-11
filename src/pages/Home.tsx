import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  HStack,
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
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';

const Home = () => {
  return (
    <>
      {/* Banner */}
      <Box
        as={'section'}
        position={'relative'}
        py={24}
        background={colors.primary}
      >
        <Container>
          <Text
            textTransform={'uppercase'}
            fontSize={'4xl'}
            fontWeight={'bold'}
            color={colors.white}
          >
            Got Trash?
          </Text>

          <Text maxW={'40%'} mt={4} color={colors.white}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia optio
            earum quis beatae, tempore tempora nisi, blanditiis sunt rerum
            aliquam labore amet soluta tenetur dolores quas asperiores nihil
            accusantium consequatur?
          </Text>

          <Button
            textTransform={'uppercase'}
            w={'fit-content'}
            mt={6}
            bg={colors.black}
            color={colors.white}
            borderRadius={'none'}
          >
            Sell to us
          </Button>
        </Container>
      </Box>

      <Box as={'section'} py={24}>
        <Container>
          <Flex gap={12}>
            <HStack flex={1}>
              <Box flex={1}></Box>

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

            <VStack flex={1} spacing={4} align={'normal'}>
              <Text lineHeight={'tall'}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet,
                fugiat? Sunt ut molestias repudiandae atque aspernatur
                voluptates corrupti ipsa quisquam rerum quas. Assumenda nisi
                ipsam officia. Odit perferendis natus quas.
              </Text>
              <Text lineHeight={'tall'}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet,
                fugiat? Sunt ut molestias repudiandae atque aspernatur
                voluptates corrupti ipsa quisquam rerum quas. Assumenda nisi
                ipsam officia. Odit perferendis natus quas.
              </Text>
              <Button
                mt={4}
                w={'max-content'}
                px={12}
                py={4}
                borderRadius={'none'}
                border={`1px solid ${colors.gray_700}`}
                borderTop={`3px solid ${colors.black}`}
                bg={colors.white}
              >
                Read More
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Box as={'section'} py={8} bgColor={colors.gray_100}>
        <Container>
          <Flex>
            {/* Icon */}
            <HStack flex={1} spacing={4}>
              <Text fontSize={'6xl'} fontWeight={'bold'}>
                4
              </Text>
              <Text fontSize={'2xl'}>
                Years of <br /> Establishment
              </Text>
            </HStack>

            {/* Icon */}
            <VStack flex={1} spacing={0}>
              <Text
                position={'relative'}
                fontSize={'6xl'}
                fontWeight={'bold'}
                _after={{
                  content: '"PCS"',
                  display: 'inline-block',
                  fontSize: '2xl',
                  position: 'absolute',
                  top: 4,
                  left: '105%',
                }}
              >
                1000
              </Text>
              <Text fontSize={'2xl'}>Bottles</Text>
            </VStack>

            {/* Icon */}
            <VStack flex={1} spacing={0}>
              <Text
                position={'relative'}
                fontSize={'6xl'}
                fontWeight={'bold'}
                _after={{
                  content: '"KGS"',
                  display: 'inline-block',
                  fontSize: '2xl',
                  position: 'absolute',
                  top: 4,
                  left: '105%',
                }}
              >
                1200
              </Text>
              <Text fontSize={'2xl'}>Papers</Text>
            </VStack>

            {/* Icon */}
            <VStack flex={1} spacing={0}>
              <Text
                position={'relative'}
                fontSize={'6xl'}
                fontWeight={'bold'}
                _after={{
                  content: '"PCS"',
                  display: 'inline-block',
                  fontSize: '2xl',
                  position: 'absolute',
                  top: 4,
                  left: '105%',
                }}
              >
                750
              </Text>
              <Text fontSize={'2xl'}>Ewaste</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Tabs isFitted variant="unstyled">
        <Box bgColor={colors.primary} py={4}>
          <Container>
            <HStack as={TabList} divider={<StackDivider />}>
              <Tab color={colors.white}>Recycle Services</Tab>
              <Tab color={colors.white}>Logistic Services</Tab>
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
                  zIndex={10}
                  size={48}
                  bgColor={'black'}
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
                    })`,
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
