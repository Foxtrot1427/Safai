import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginBanner, Logo } from "@rsces/assets/images";
import InputField from "@rsces/components/form/InputField";
import { useRegisterAdmin } from "@rsces/service/service-auth";
import { colors } from "@rsces/theme/colors";
import { useForm } from "react-hook-form";
import { defaultValues, schema } from "./constant";
import { Link } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";

const Register = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: onRegister, isPending: isRegistering } =
    useRegisterAdmin();

  const onSubmit = async (data: typeof defaultValues) => {
    await onRegister(data);
  };

  return (
    <Flex
      direction={{ base: "column", xl: "row-reverse" }}
      bg={colors.gray_200}
      minHeight={"100vh"}
    >
      <Flex
        flex={1}
        bg={"#52AD9C"}
        justify={"center"}
        align={"center"}
        position={"relative"}
      >
        <VStack>
          <Image src={LoginBanner} h={96} />
          <Text fontSize={"4xl"} fontWeight={700}>
            सफा, सजिलो, संरचना
          </Text>
        </VStack>
        <Text
          position={"absolute"}
          bottom={8}
          right={8}
          fontSize={"xs"}
          fontWeight={500}
        >
          All rights reserved © 2023 फोहोर मोहोर
        </Text>
      </Flex>
      <Flex flex={1} justify={"center"} align={"center"} position={"relative"}>
        <Image src={Logo} h={20} position={"absolute"} left={8} top={8} />
        <Box w={"400px"}>
          <Text fontSize={"4xl"} fontWeight={700} mb={6}>
            Register
          </Text>
          <VStack as={"form"} spacing={4} onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="name"
              control={control}
              errors={errors}
              label="Name"
              placeholder="Enter your name"
            />
            <InputField
              name="address"
              control={control}
              errors={errors}
              label="Address"
              placeholder="Enter your address"
            />
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
            <Link
              to={NAVIGATION_ROUTES.ADMIN_LOGIN}
              style={{
                alignSelf: "start",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                color: colors.primary,
              }}
            >
              Already have an account? Log in
            </Link>
            <Button
              type="submit"
              alignSelf={"start"}
              mt={2}
              w={"160px"}
              borderRadius={"50px"}
              isLoading={isRegistering}
            >
              Signup
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
