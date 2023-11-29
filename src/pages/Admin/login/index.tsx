import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { LoginBanner, Logo } from '@rsces/assets/images';
import InputField from '@rsces/components/form/InputField';
import { colors } from '@rsces/theme/colors';
import { useForm } from 'react-hook-form';
import { defaultValues, schema } from './constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@rsces/service/service-auth';

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: onLogin, isPending: isLoggingIn } = useLogin();

  const onSubmit = async (data: typeof defaultValues) => {
    await onLogin(data);
  };

  return (
    <Flex
      direction={{ base: 'column', xl: 'row' }}
      bg={colors.gray_200}
      minHeight={'100vh'}
    >
      <Flex
        flex={1}
        bg={'#52AD9C'}
        justify={'center'}
        align={'center'}
        position={'relative'}
      >
        <VStack>
          <Image src={LoginBanner} h={96} />
          <Text fontSize={'4xl'} fontWeight={700}>
            सफा, सजिलो, संरचना
          </Text>
        </VStack>
        <Text
          position={'absolute'}
          bottom={8}
          right={8}
          fontSize={'xs'}
          fontWeight={500}
        >
          All rights reserved © 2023 फोहोर मोहोर
        </Text>
      </Flex>
      <Flex flex={1} justify={'center'} align={'center'} position={'relative'}>
        <Image src={Logo} h={20} position={'absolute'} left={8} top={8} />
        <Box w={'400px'}>
          <Text fontSize={'4xl'} fontWeight={700} mb={6}>
            Log in
          </Text>
          <VStack as={'form'} spacing={4} onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="email"
              control={control}
              errors={errors}
              label="Email"
              placeholder="Enter your email"
            />
            <InputField
              name="password"
              control={control}
              errors={errors}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button
              type="submit"
              alignSelf={'start'}
              mt={2}
              w={'160px'}
              borderRadius={'50px'}
              isLoading={isLoggingIn}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
