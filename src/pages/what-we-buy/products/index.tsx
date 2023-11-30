import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { IProduct, useProducts } from '@rsces/service/service-products';
import { colors } from '@rsces/theme/colors';
import { useState } from 'react';
import Product from './product';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid
        templateColumns={'repeat(auto-fit, minmax(250px, 1fr))'}
        rowGap={8}
        columnGap={8}
        justifyItems={'center'}
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
        {products?.map((product) => (
          <Flex
            role="group"
            position={'relative'}
            boxShadow={'sm'}
            key={product.id}
            justify={'center'}
            width={'250px'}
            aspectRatio={1 / 1}
            overflow={'hidden'}
          >
            <Box
              position={'absolute'}
              inset={0}
              width={'full'}
              height={'full'}
              _groupHover={{
                bg: colors.black,
                opacity: 0.2,
              }}
            />
            <Box
              position={'absolute'}
              display={'none'}
              _groupHover={{
                display: 'grid',
                height: 'full',
                placeItems: 'center',
              }}
            >
              <Button
                color={colors.gray_200}
                borderRadius={'50px'}
                variant={'solid'}
                onClick={() => {
                  setSelectedProduct(product);
                  onOpen();
                }}
              >
                Buy This
              </Button>
            </Box>
            <Image
              src={product.image}
              alt={product.name}
              h={'full'}
              objectFit={'cover'}
            />
          </Flex>
        ))}
      </Grid>
      {selectedProduct && (
        <Product
          product={selectedProduct}
          modal={{
            isProductModalOpen: isOpen,
            onProductModalClose: onClose,
          }}
        />
      )}
    </>
  );
};

export default Products;
