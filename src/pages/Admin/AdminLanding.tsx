import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { DataTable } from '@rsces/components/DataTable';
import Header from '@rsces/components/Header/Header';
import { useGetDonations } from '@rsces/service/Admin/Donations/getDonations';
import { colors } from '@rsces/theme/colors';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import LayoutDashboard from './Layout';

export interface IDonation {
  id: number;
  name: string;
  number: string;
  itemName: string;
  image: string;
  pickUpDate: string;
  pickUpTime: string;
  created_at: string;
  updated_at: string;
  description: string;
}
const AdminLanding = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const columnFilters: ColumnFiltersState = [];
  const { data: donationData } = useGetDonations();

  // const columnHelper = createColumnHelper<IDonation>();
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessorKey: 'id',
      },
      {
        Header: 'Name',
        accessorKey: 'name',
      },
      {
        Header: 'Number',
        accessorKey: 'number',
      },
      {
        Header: 'Item Name',
        accessorKey: 'itemName',
      },
      {
        Header: 'Image',
        accessorKey: 'image',
      },
      {
        Header: 'Pick Up Date',
        accessorKey: 'pickUpDate',
      },
      {
        Header: 'Pick Up Time',
        accessorKey: 'pickUpTime',
      },
      {
        Header: 'Description',
        accessorKey: 'description',
      },
    ],
    [],
  );
  return (
    <LayoutDashboard>
      <Header masterTitle="Admin" title={'Page'} />
      <Flex justify={'space-between'} align={'center'} my={8}>
        <HStack spacing={3}>
          <HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h={10}>
                <CiSearch color={colors.gray_700} fontSize={'16px'} />
              </InputLeftElement>
              <Input
                w={'220px'}
                h={'42px'}
                borderRadius={'8px'}
                border={'1px solid var(--gray-100, #EDF2F7)'}
                placeholder="Search"
                fontSize={'14px'}
                onChange={({ target: { value } }) => setSearchFilter(value)}
              />
            </InputGroup>
          </HStack>
        </HStack>
        <Button
          variant={'primaryLighter'}
          size={'fit'}
          leftIcon={<BiPlus fontSize={'24px'} />}
          onClick={() => {}}
        >
          Add X
        </Button>
      </Flex>
      <DataTable
        columns={columns}
        data={donationData ?? []}
        filter={{
          globalFilter: searchFilter,
          columnFilters: columnFilters,
        }}
      />
    </LayoutDashboard>
  );
};

export default AdminLanding;
