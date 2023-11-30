import { createColumnHelper } from '@tanstack/react-table';
import { HStack, IconButton, Image } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { IDonation } from './interface';

const columnHelper = createColumnHelper<IDonation>();

export const donationColumns = [
  columnHelper.display({
    header: 'S.N.',
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('number', {
    header: 'Number',
  }),
  columnHelper.accessor('itemName', {
    header: 'Item Name',
  }),
  columnHelper.accessor('image', {
    header: 'Image',
    cell: ({ row }) => (
      <Image src={row.original.image} alt={row.original.itemName} h={8} />
    ),
  }),
  columnHelper.accessor('pickUpDate', {
    header: 'Pick Up Date',
    cell: ({ row }) => new Date(row.original.pickUpDate).toDateString(),
  }),
  columnHelper.accessor('pickUpTime', {
    header: 'Pick Up Time',
    cell: ({ row }) =>
      new Date(row.original.pickUpTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  {
    header: 'Action',
    accessorKey: 'action',
    cell: () => (
      <HStack spacing={0}>
        <IconButton
          p={0}
          variant={'ghost'}
          aria-label="Edit Donation"
          icon={<EditIcon />}
          onClick={() => {}}
        />
        <IconButton
          variant={'ghost'}
          aria-label="Delete Donation"
          icon={<DeleteIcon />}
          onClick={() => {}}
        />
      </HStack>
    ),
  },
];
