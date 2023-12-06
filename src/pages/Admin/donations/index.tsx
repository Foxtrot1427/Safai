import { Flex } from '@chakra-ui/react';
import { DataTable } from '@rsces/components/DataTable';
import { useDonations } from '@rsces/service/service-donation';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useState } from 'react';
import SearchBar from '../Layout/SearchBar';
import { donationColumns } from './column';

const AdminDonations = () => {
  const [searchFilterData, setSearchFilterData] = useState('');
  const columnFilters: ColumnFiltersState = [];
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }
  const { data: donationData, isLoading } = useDonations();

  return (
    <>
      <Flex justify={'space-between'} align={'center'} my={8}>
        <SearchBar getFilterData={searchFilterDataProp} />
      </Flex>
      <DataTable
        columns={donationColumns()}
        data={donationData ?? []}
        filter={{
          globalFilter: searchFilterData,
          columnFilters: columnFilters,
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default AdminDonations;
