import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import { IProduct } from "@rsces/service/service-products";
import { useForm } from "react-hook-form";
import { defaultValues, schema } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateInterest } from "@rsces/service/service-interest";
import { formatMoney } from "@rsces/utils/formatMoney";
import { colors } from "@rsces/theme/colors";

const Product = ({
  product,
  modal,
}: {
  product: IProduct;
  modal: { isProductModalOpen: boolean; onProductModalClose: () => void };
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: createInterest, isPending: isCreatingInterest } =
    useCreateInterest();

  const onSubmit = async (data: typeof defaultValues) => {
    await createInterest({
      productId: product.id,
      data,
    });
    reset(defaultValues);
    modal.onProductModalClose();
  };

  return (
    <Modal
      size={"5xl"}
      isCentered
      isOpen={modal.isProductModalOpen}
      onClose={modal.onProductModalClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={12} px={8} py={4}>
          <Flex gap={8} direction={{ base: "column", lg: "row" }}>
            <Box flex={0.7} position={"relative"}>
              <Box>
                <Image
                  src={product.image}
                  alt={product.name}
                  objectFit="cover"
                  width="full"
                  height="300px"
                  border="1px solid #eee"
                />
                <Text mt={2} fontSize="md" fontWeight={700}>
                  {product.name}
                </Text>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  fontStyle="italic"
                >
                  {product.description}
                </Text>
                <Flex>
                  <Text fontSize="sm" fontWeight={600} color={colors.primary}>
                    {formatMoney(Number(product.price))}&nbsp;&nbsp;
                  </Text>
                  <Text fontSize="sm">
                    ({product.interests.length} Interests)
                  </Text>
                </Flex>
              </Box>
            </Box>
            <Box flex={1}>
              <VStack as={"form"} spacing={0} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  name="name"
                  label="Name"
                  placeholder="Your Name"
                  control={control}
                  errors={errors}
                />
                <InputField
                  name="number"
                  label="Phone Number"
                  placeholder="Your Phone Number"
                  control={control}
                  errors={errors}
                />
                <Textarea
                  name="description"
                  label="Description"
                  placeholder="Note (if any)"
                  control={control}
                />
                <Button
                  type="submit"
                  mt={4}
                  alignSelf={"flex-end"}
                  borderRadius={"full"}
                  width={"120px"}
                  isLoading={isCreatingInterest}
                >
                  Buy This
                </Button>
              </VStack>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Product;
