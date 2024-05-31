import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IProduct, useProducts } from "@rsces/service/service-products";
import { colors } from "@rsces/theme/colors";
import { CiShoppingBasket } from "react-icons/ci";
import Product from "./product";
import { formatMoney } from "@rsces/utils/formatMoney";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        direction="column"
        boxShadow="0 0 2px 1px #ddd"
        w="full"
        p={2}
        cursor="pointer"
        role="group"
        onClick={onOpen}
      >
        <Box overflow="hidden" w="full">
          <Image
            src={product.image}
            alt={product.name}
            width="full"
            height="250px"
            objectFit={"cover"}
            rounded={"sm"}
            transition="all 250ms ease-in-out"
            _groupHover={{
              transform: "scale(1.05)",
            }}
          />
        </Box>
        <Flex justify="space-between" align="center">
          <Badge bg="green.100" fontSize="2xs" px={2} py={0.5} fontWeight={600}>
            {product.type}
          </Badge>
          <Button
            variant="unstyled"
            fontSize="xs"
            leftIcon={<CiShoppingBasket fontSize={22} />}
            display="flex"
            alignItems="center"
            textTransform="uppercase"
            _hover={{
              color: colors.primary,
            }}
          >
            Buy
          </Button>
        </Flex>
        <Text fontSize="xl" fontWeight={600}>
          {product.name}
        </Text>
        <Divider my={1} />
        <Flex justify="space-between">
          <Flex direction="column">
            <Text fontWeight={600} fontSize="2xs" textTransform="uppercase">
              Price
            </Text>
            <Text fontSize="xs">{formatMoney(+product.price)}</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text fontWeight={600} fontSize="2xs" textTransform="uppercase">
              Interests
            </Text>
            <Text fontSize="xs">{product.interests.length}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Product
        product={product}
        modal={{
          isProductModalOpen: isOpen,
          onProductModalClose: onClose,
        }}
      />
    </>
  );
};

const Products = () => {
  const { data: products, isLoading: isProductsLoading } = useProducts();

  return (
    <>
      <Grid
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
        rowGap={8}
        columnGap={6}
        justifyItems={"center"}
      >
        {isProductsLoading && (
          <VStack>
            <Spinner />
            <Text>Loading...</Text>
          </VStack>
        )}
        {!isProductsLoading && products?.length === 0 && (
          <Text>No products found.</Text>
        )}
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </>
  );
};

export default Products;
