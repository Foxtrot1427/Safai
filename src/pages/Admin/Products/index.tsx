import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  HStack,
  IconButton,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { DataTable } from '@rsces/components/DataTable';
import ConfirmationModel from '@rsces/components/Modal/conformationModal';
import {
  IProduct,
  useDeleteProduct,
  useProducts,
} from '@rsces/service/service-products';
import { ColumnFiltersState, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import SearchBar from '../Layout/SearchBar';

const AdminProducts = () => {
  const { data: productData, isLoading } = useProducts();
  const [searchFilterData, setSearchFilterData] = useState('');
  const columnFilters: ColumnFiltersState = [];
  const [deleteId, setDeleteId] = useState<number | null>(null);
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }
  const { mutate: deleteProduct } = useDeleteProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<IProduct>();

  const onDelete = () => {
    if (deleteId) {
      // Delete product
      deleteProduct(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          onClose();
        },
      });
    }
  };

  const productsColumns = useMemo(
    () => [
      columnHelper.display({
        header: 'S.N.',
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('price', {
        header: 'Price',
      }),
      columnHelper.accessor('interest', {
        header: 'Intrest',
      }),
      columnHelper.accessor('image', {
        header: 'Image',
        cell: ({ row }) => (
          <Image src={row.original.image} alt={row.original.name} h={8} />
        ),
      }),
      columnHelper.accessor('admin', {
        header: 'Created by',
        cell: ({ row }) => row.original.admin.name,
      }),
      columnHelper.accessor('id', {
        header: 'Actions',
        cell: ({ row }) => (
          <HStack spacing={0}>
            <IconButton
              p={0}
              variant={'ghost'}
              aria-label="Edit Donation"
              icon={<EditIcon />}
              onClick={() => {
                console.log('clicked');
              }}
            />
            <IconButton
              variant={'ghost'}
              aria-label="Delete Donation"
              icon={<DeleteIcon />}
              onClick={() => {
                console.log('clicked');
                setDeleteId(row.original.id);
                onOpen();
              }}
            />
          </HStack>
        ),
      }),
    ],
    [productData],
  );

  return (
    <>
      <Flex justify={'space-between'} align={'center'} my={8}>
        <SearchBar getFilterData={searchFilterDataProp} />
      </Flex>
      <DataTable
        columns={productsColumns}
        data={productData ?? []}
        filter={{
          globalFilter: searchFilterData,
          columnFilters: columnFilters,
        }}
        isLoading={isLoading}
      />
      {/* Delete Confirmation Modal */}
      <ConfirmationModel
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onDelete}
      />
    </>
  );
};

export default AdminProducts;
