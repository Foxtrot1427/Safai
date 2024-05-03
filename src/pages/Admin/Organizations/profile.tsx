import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
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
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalForm from "@rsces/components/Modal/modalForm";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import { useFileFromUrl } from "@rsces/service/service-file";
import {
  useGetOneOrganization,
  useUpdateOrganization,
} from "@rsces/service/service-organizations";
import { colors } from "@rsces/theme/colors";
import { toFormData } from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsUpload } from "react-icons/bs";
import { useParams } from "react-router-dom";
import * as yup from "yup";
const defaultValues = {
  name: "",
  image: null as unknown as File,
  description: "",
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Price is required"),
  image: yup.mixed<File>().required("Image is required"),
});
const OrganizationProfile = () => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  // const [imageUrl, setImageUrl] = useState("");
  const [imageUrl] = useState("");
  const { data: imageFile } = useFileFromUrl(imageUrl);
  const { mutate: editOrganization } = useUpdateOrganization();
  const { data: organization, isLoading } = useGetOneOrganization(id ?? "");

  console.log(organization);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const info = [{ email: "" }];
  useEffect(() => {
    if (!imageFile) return;
    setValue("image", imageFile);
  }, [imageFile, setValue]);
  const onSubmit = (data: typeof defaultValues) => {
    const formdata = toFormData(data, undefined, {
      indexes: null,
    });
    id &&
      editOrganization(
        { id: +id, data: formdata },
        {
          onSuccess: () => {
            onEditClose();
            reset(defaultValues);
          },
        },
      );
  };
  return isLoading ? (
    <Flex justifyContent="center" alignItems="center" height="80vh">
      <Spinner />
    </Flex>
  ) : (
    <>
      <Box height="80dvh" mt="42.5px">
        <Box
          width="100%"
          position="relative"
          bgColor={"blue.600"}
          className="banner"
        >
          <Box bgColor={"#5B90E4"} h={48} width={"100%"} />
          <Flex
            position={"absolute"}
            top="100%"
            left="44px"
            transform={`translateY(-50%)`}
          >
            <Box position="relative">
              <Avatar
                border={`6px solid ${colors.white} `}
                size={"2xl"}
                name={"name"}
                src={organization?.image}
              />
            </Box>
            <Box>
              <Box ml="20px" mt="10px">
                <Text color={colors.white} fontWeight={600}>
                  {organization?.name}
                </Text>
                <Text fontSize="14px" color={colors.white}></Text>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Flex>
          <Box
            mt="100px"
            ml="35px"
            textAlign="center"
            className="info"
            maxW={"40%"}
          >
            <Text letterSpacing="0.25px" fontWeight="500" fontSize="30px">
              {organization?.name}
            </Text>
            <Text
              mt="8px"
              fontWeight="400"
              fontSize="14px"
              color={colors.gray_700}
              letterSpacing="0.25px"
            >
              {organization?.description}
            </Text>
            <HStack>
              <Button
                onClick={() => {
                  // setImageUrl(organization?.image);
                  reset({
                    name: organization?.name,
                    description: organization?.description,
                    // image: organization?.image,
                  });
                  onEditOpen();
                }}
                width=" 119.667px"
                height="41px"
                variant={"edit"}
                gap="8px"
                mt="20px"
              >
                <BsPencilSquare />
                Edit
              </Button>
              <Button
                onClick={() => {
                  // setImageUrl(organization?.image);
                  // reset({
                  //   name: organization?.name,
                  //   description: organization?.description,
                  // });
                  // onEditOpen();
                }}
                width=" 119.667px"
                height="41px"
                variant={"edit"}
                gap="8px"
                mt="20px"
              >
                <BsPencilSquare />
                Donations
              </Button>
              <Button
                // onClick={onOpen}
                variant={"delete"}
                width=" 119.667px"
                height="41px"
                gap="8px"
                mt="20px"
              >
                <DeleteIcon />
                Delete
              </Button>
            </HStack>
          </Box>
          <Box
            mt="50px"
            ml="20px"
            width="1380px"
            borderRadius="12px"
            p="40px"
            border={`2px solid ${colors.gray_100}`}
          >
            <Grid templateColumns="repeat(2, 1fr)">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {info?.map((user: any, ind: number) => (
                <GridItem key={`${ind}`}>
                  <Flex mb="20px" gap="8px">
                    <Text
                      fontWeight="400"
                      fontSize="14px"
                      color={colors.gray_600}
                      width="121px"
                    >
                      {Object.keys(user)[0].charAt(0).toLocaleUpperCase() +
                        Object.keys(user)[0].slice(1)}
                    </Text>
                    <Text
                      color={colors.gray_600}
                      fontWeight="400"
                      fontSize="14px"
                      ml="24px"
                      mr="16px"
                    >
                      :
                    </Text>
                    <Text
                      width="211px"
                      color={colors.gray_600}
                      fontWeight="400"
                      fontSize="14px"
                    >
                      {Object.values(user)[0] === Boolean(true)
                        ? "True"
                        : Object.values(user)[0] === Boolean(false)
                          ? "False"
                          : Object.values(user)}
                    </Text>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Box>
      <ModalForm
        isOpen={isEditOpen}
        onClose={() => {
          onEditClose();
          reset(defaultValues);
        }}
        title={"Add Organization"}
        size={{ base: "full", md: "lg" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmit)}
        // isSubmitting= {}
      >
        <>
          <InputField
            control={control}
            name="name"
            label="Name"
            placeholder="Enter Organization name"
            errors={errors}
          />
          <Textarea
            control={control}
            name="description"
            label="Description"
            placeholder="Enter Organization Description"
          />
          <Flex>
            <FormControl h={"full"}>
              <Input
                type="file"
                display={"none"}
                {...register("image")}
                ref={e => {
                  register("image").ref(e);
                  imageRef.current = e;
                }}
                onChange={e => {
                  if (!e.target.files) return;
                  setValue("image", e.target.files?.[0]);
                }}
              />
              <FormLabel fontSize={"sm"}>Item (Image)</FormLabel>
              <Button
                width={"full"}
                variant={"outline"}
                onClick={() => imageRef.current?.click()}
              >
                <HStack spacing={2}>
                  <BsUpload />
                  <Text>Upload</Text>
                </HStack>
              </Button>
              {watch("image") && (
                <Image
                  src={
                    watch("image")
                      ? URL.createObjectURL(watch("image") || "")
                      : ""
                  }
                  alt="Item image"
                  h={48}
                  mt={2}
                  mx={"auto"}
                />
              )}
            </FormControl>
          </Flex>
        </>
      </ModalForm>
    </>
  );
};

export default OrganizationProfile;
