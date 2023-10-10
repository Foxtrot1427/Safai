import { Box, Button, Flex, Grid, HStack, Text } from '@chakra-ui/react';
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';

const WhatWeBuy = () => {
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
          <Text>Yu can do</Text>
          <Text textTransform={'capitalize'} align={'center'} fontSize={'2xl'}>
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
          <Grid
            templateColumns={'repeat(auto-fit, minmax(250px, 1fr))'}
            rowGap={8}
            columnGap={8}
            justifyItems={'center'}
          >
            {Array.from(new Array(16)).map((_, index) => (
              <Box
                key={index}
                height={'200px'}
                w={'full'}
                bgColor={colors.gray_200}
              />
            ))}
          </Grid>

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

          <Flex mt={12}>
            <Box flex={1}>
              <Text
                align={'center'}
                fontSize={'2xl'}
                fontWeight={'bold'}
                w={'35%'}
              >
                Please fill the form if you want to
                <br />
                <span style={{ color: colors.primary, fontSize: '50px' }}>
                  SALE
                </span>
                <br />
                your trash
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
                  bg={colors.gray}
                  transform={'rotate(45deg) translate(20px, 5px)'}
                ></Box>
                <Box
                  width={'100px'}
                  transform={'rotate(45deg) translate(50px, -25px)'}
                  aspectRatio={1}
                  bg={colors.gray}
                ></Box>
                <Box
                  width={'100px'}
                  transform={'rotate(45deg) translate(55px, -60px)'}
                  aspectRatio={1}
                  bg={colors.gray}
                ></Box>
              </Box>
            </Box>

            <Box flex={1}></Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default WhatWeBuy;
