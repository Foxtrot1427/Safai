import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { DataTable } from '@rsces/components/DataTable';
import { useDonations } from '@rsces/service/service-donation';
import { colors } from '@rsces/theme/colors';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { donationColumns } from './column';

const AdminDonations = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const columnFilters: ColumnFiltersState = [];
  const { data: donationData } = useDonations();

  return (
    <>
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
      </Flex>
      <DataTable
        columns={donationColumns}
        data={donationData ?? []}
        filter={{
          globalFilter: searchFilter,
          columnFilters: columnFilters,
        }}
      />
    </>
  );
};

export default AdminDonations;
