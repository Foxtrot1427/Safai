import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';
import Donation from './donation/Donation';
import Products from './products';
import {
  ETrash,
  Newspapers,
  Trash,
  WhatWeBuyBanner,
} from '@rsces/assets/images';

const WhatWeBuy = () => {
  return (
    <>
      <Box as={'section'} h={'700px'}>
        <Box
          h={'inherit'}
          mx={'auto'}
          color={colors.white}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          bgImage={WhatWeBuyBanner}
          bgSize={'cover'}
          bgPosition={'center center'}
          position={'relative'}
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
          <Text textTransform={'uppercase'} align={'center'} fontSize={'2xl'}>
            You can sell items
          </Text>
          <Text
            textTransform={'uppercase'}
            align={'center'}
            fontSize={'5xl'}
            fontWeight={'bold'}
          >
            What we buy
          </Text>
        </Box>
      </Box>

      <Box as={'section'} py={16}>
        <Container>
          <HStack gap={8} mb={8}>
            <Box
              w={'full'}
              flex={1}
              h={0}
              border={'2px solid'}
              borderColor={colors.gray_200}
            />
            <Text
              width={'fit-content'}
              position={'relative'}
              fontSize={'2xl'}
              fontWeight={600}
              textTransform={'uppercase'}
              color={colors.primary}
            >
              Products
            </Text>
            <Box
              w={'full'}
              flex={1}
              h={0}
              border={'2px solid'}
              borderColor={colors.gray_200}
            />
          </HStack>
          <Products />

          <HStack justify={'center'} mt={12}>
            <Button
              borderRadius={'none'}
              bg={colors.primary}
              color={colors.white}
              px={12}
              py={4}
            >
              Load More
            </Button>
          </HStack>
        </Container>
      </Box>

      <Box bgColor={colors.gray_200} py={24}>
        <Container>
          <Text textTransform={'uppercase'} fontSize={'2xl'} align={'center'}>
            Fill up form to sell trash
          </Text>
          <Text
            textTransform={'uppercase'}
            fontSize={'5xl'}
            fontWeight={'bold'}
            align={'center'}
          >
            Sell Now
          </Text>

          <Flex mt={12} gap={16}>
            <Box flex={0.6}>
              <VStack>
                <Text
                  align={'center'}
                  fontSize={'2xl'}
                  fontWeight={'bold'}
                  w={'50%'}
                >
                  Please fill the form if you want to &nbsp;
                  <span
                    style={{
                      color: colors.primary,
                      fontSize: '50px',
                      display: 'block',
                    }}
                  >
                    SALE
                  </span>
                  &nbsp; your trash
                </Text>

                <Box
                  display={'flex'}
                  w={'250px'}
                  flexWrap={'wrap'}
                  ml={'-20px'}
                  mt={12}
                >
                  <Box
                    width={'100px'}
                    aspectRatio={1}
                    bg={colors.white}
                    border={`3px solid ${colors.primary}`}
                    transform={'rotate(45deg) translate(20px, 5px)'}
                    overflow={'hidden'}
                  >
                    <Image
                      src={Trash}
                      h={'full'}
                      objectFit={'cover'}
                      transform={'rotate(-45deg) '}
                    />
                  </Box>
                  <Box
                    width={'100px'}
                    transform={'rotate(45deg) translate(50px, -25px)'}
                    border={`3px solid ${colors.primary}`}
                    aspectRatio={1}
                    bg={colors.white}
                    overflow={'hidden'}
                  >
                    <Image
                      src={Newspapers}
                      h={'full'}
                      objectFit={'cover'}
                      transform={'rotate(-45deg) '}
                    />
                  </Box>
                  <Box
                    width={'100px'}
                    transform={'rotate(45deg) translate(55px, -60px)'}
                    border={`3px solid ${colors.primary}`}
                    aspectRatio={1}
                    bg={colors.white}
                    overflow={'hidden'}
                  >
                    <Image
                      src={ETrash}
                      h={'full'}
                      objectFit={'cover'}
                      transform={'rotate(-45deg) '}
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>

            <Box flex={1} bg={colors.gray_100} borderRadius={'xl'} p={8}>
              <Donation />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default WhatWeBuy;
