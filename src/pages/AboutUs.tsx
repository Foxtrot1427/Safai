import {
  Box,
  Flex,
  ListIcon,
  ListItem,
  Square,
  StackDivider,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';

import { PiPaperPlaneRightFill } from 'react-icons/pi';

const AboutUs = () => {
  return (
    <>
      <Box as={'section'} h={'400px'}>
        <Box
          w={'50%'}
          h={'inherit'}
          mx={'auto'}
          bgColor={colors.primary}
          opacity={0.5}
          color={colors.white}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Text textTransform={'uppercase'} align={'center'} fontSize={'2xl'}>
            Our Company & Motto
          </Text>
          <Text
            textTransform={'uppercase'}
            align={'center'}
            fontSize={'5xl'}
            fontWeight={'bold'}
          >
            About us
          </Text>
        </Box>
      </Box>

      <Box as={'section'} py={24} bgColor={colors.gray_200}>
        <Container>
          <Flex gap={48}>
            <VStack divider={<StackDivider borderColor={colors.gray} />}>
              {/* Icon */}
              <VStack flex={1} spacing={4}>
                <Text
                  position={'relative'}
                  fontSize={'6xl'}
                  fontWeight={'bold'}
                  _after={{
                    content: '"YRS"',
                    display: 'inline-block',
                    fontSize: '2xl',
                    position: 'absolute',
                    top: 4,
                    left: '105%',
                  }}
                >
                  4
                </Text>
                <Text fontSize={'2xl'} align={'center'}>
                  Years of <br /> Establishment
                </Text>
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
                  1000
                </Text>
                <Text fontSize={'2xl'} align={'center'}>
                  Bottles
                </Text>
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
                <Text fontSize={'2xl'} align={'center'}>
                  Papers
                </Text>
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
                  10000
                </Text>
                <Text fontSize={'2xl'} align={'center'}>
                  Ewaste
                </Text>
              </VStack>
            </VStack>

            <VStack flex={1} spacing={8}>
              <Text fontSize={'3xl'} fontWeight={'bold'}>
                Few Words About Us
              </Text>
              <Text fontSize={'xl'} align={'center'} mt={8}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatibus eos ex eaque sequi quisquam exercitationem iste
                nemo assumenda. Animi, quam! Delectus suscipit recusandae ipsum
                veritatis? Similique unde possimus vero ullam!
              </Text>

              <Text align={'center'} lineHeight={'tall'}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
                repellat facilis nulla eveniet non reprehenderit, ipsa modi
                tempore dolorem natus animi at! Delectus, eum distinctio
                corporis nam vero itaque enim? Harum autem recusandae
                voluptates? Perferendis ullam aliquid reiciendis molestiae
                quisquam porro tempore, ipsam natus similique ipsum, cupiditate
                excepturi animi neque earum repudiandae ut dolore inventore
                tempora consectetur ea architecto error. Repudiandae dolore nisi
                eveniet optio obcaecati voluptatibus rem eligendi illo
                temporibus a ratione voluptatem quisquam ea pariatur, expedita
                quos quis deleniti quibusdam officia nobis. Sit iste suscipit
                aliquam distinctio magni. Labore accusamus odit cumque ducimus
                porro, delectus in explicabo eos unde exercitationem
                necessitatibus. Blanditiis quo obcaecati rerum delectus quae,
                excepturi, voluptatibus reiciendis quos aut consequuntur
                recusandae eveniet cupiditate assumenda pariatur?
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Box>

      <Box as={'section'} py={24} position={'relative'}>
        <Container>
          <Box w={'60%'} ml={'auto'}>
            <Text textTransform={'uppercase'} fontSize={'2xl'}>
              Our Mission, Vision & Goals
            </Text>
            <Text
              textTransform={'uppercase'}
              fontSize={'5xl'}
              fontWeight={'bold'}
            >
              Why we exist?
            </Text>

            <Box mt={12}>
              <Text fontSize={'xl'} fontWeight={'bold'} mb={4}>
                Our Mission
              </Text>
              <UnorderedList listStyleType={'none'} spacing={2}>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Collect the dry solid waste from door to door and use
                  integrated 3R (Reuse, Reduce and Recycle) approach
                </ListItem>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Quantity of Landfill waste can be significantly reduced by
                  collecting the dry waste in source.
                </ListItem>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Research for new innovative product from waste material.
                </ListItem>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Create employment opportunity through waste management.
                </ListItem>
              </UnorderedList>

              <Text mt={8} fontSize={'xl'} fontWeight={'bold'} mb={4}>
                Our Vision
              </Text>
              <UnorderedList listStyleType={'none'} spacing={2}>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Solid waste has significant economic value.
                </ListItem>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Solid waste should be separate in source according to
                  degradable and non-degradable.
                </ListItem>
                <ListItem>
                  <ListIcon as={PiPaperPlaneRightFill} color={colors.gray} />
                  Solid waste has many opportunity.
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>

          <Flex mt={16} bgColor={colors.primary} align={'center'} gap={8}>
            <Square size={24} bg={'black'} />

            <Text color={colors.white} flex={1} fontSize={'xl'}>
              <span style={{ fontWeight: 700 }}>Our Goal: </span>
              Establish recycle factory for dry solid waste.
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default AboutUs;
