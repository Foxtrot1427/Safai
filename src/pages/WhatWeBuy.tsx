import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import InputField from '@rsces/components/form/InputField';
import Container from '@rsces/components/ui/Container';
import { colors } from '@rsces/theme/colors';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';

const WhatWeBuy = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useForm();
  console.log(watch());

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
            {/* PRODUCTS */}
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
                      src="https://i.pinimg.com/564x/d2/41/a7/d241a7d070f6599c8bb2e4f1061b6793.jpg"
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
                      src="https://i.pinimg.com/564x/26/15/20/261520b98f4fbcc2f1af2fff39dd4923.jpg"
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
                      src="https://i.pinimg.com/564x/9e/78/fb/9e78fb661f72b15bc669b496ee2c0fbf.jpg"
                      h={'full'}
                      objectFit={'cover'}
                      transform={'rotate(-45deg) '}
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>

            <Box flex={1} bg={colors.gray_100} borderRadius={'xl'} p={8}>
              <Grid
                as={'form'}
                templateColumns={'repeat(2, 1fr)'}
                columnGap={6}
              >
                <InputField
                  name="name"
                  label="Name"
                  placeholder={'Your Name'}
                  control={control}
                  errors={errors}
                />
                <InputField
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Your Phone Number"
                  control={control}
                  errors={errors}
                />
                <InputField
                  name="itemName"
                  label="Item"
                  placeholder="Enter Item name"
                  control={control}
                  errors={errors}
                />
                <InputField
                  type="date"
                  name="pickupDate"
                  label="Pickup Date"
                  placeholder="Schedule for Pickup date"
                  control={control}
                  errors={errors}
                />
                <GridItem rowSpan={3}>
                  <FormControl h={'full'}>
                    <Input
                      type="file"
                      display={'none'}
                      {...register('itemImage')}
                      ref={(e) => {
                        register('itemImage').ref(e);
                        imageRef.current = e;
                      }}
                    />
                    <FormLabel fontSize={'sm'}>Item (Image)</FormLabel>
                    <Button
                      width={'full'}
                      variant={'outline'}
                      onClick={() => imageRef.current?.click()}
                    >
                      <HStack spacing={2}>
                        <BsUpload />
                        <Text>Upload</Text>
                      </HStack>
                    </Button>
                    {watch('itemImage')?.[0] && (
                      <Image
                        src={URL.createObjectURL(watch('itemImage')?.[0] || '')}
                        alt="Item image"
                        h={48}
                        mt={2}
                        mx={'auto'}
                      />
                    )}
                  </FormControl>
                </GridItem>
                <InputField
                  type="time"
                  name="pickupTime"
                  label="Pickup Time"
                  placeholder="Time for pickup"
                  control={control}
                  errors={errors}
                />
                <FormControl mt={2}>
                  <FormLabel fontSize={'sm'}>Description</FormLabel>
                  <Textarea
                    placeholder="Note (if any)"
                    resize={'none'}
                    minH={'150px'}
                    borderColor={'gray.400'}
                    {...register('description')}
                  />
                </FormControl>
                <Button
                  mt={4}
                  type="submit"
                  w={'160px'}
                  justifySelf={'flex-end'}
                >
                  Submit
                </Button>
              </Grid>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default WhatWeBuy;
