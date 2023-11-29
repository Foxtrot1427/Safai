import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Select,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlinePushpin } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';

import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { colors } from '@rsces/theme/colors';

export type DataTableProps = {
  data: Record<string, any>[];
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  pinColumnAccess?: boolean;
  showFooter?: boolean;
  pagination?: {
    count: number;
    onSortChange?: (number: number) => void;
    onPageChange?: (number: number) => void;
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter?: Dispatch<SetStateAction<string>>;
    columnFilters: ColumnFiltersState;
    setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  };
  sortingColumn?: string;
  setTable?: (table: any) => void;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const tooltipLabel = 'Select the number of items to be displayed';

export function DataTable({
  data,
  columns,
  pagination,
  isLoading,
  setTable,
  filter,
  pinColumnAccess,
  showFooter,
  sortingColumn,
}: DataTableProps) {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [stickyColumn, setStickyColumn] = useState<null | number>(null);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [pageCount, setPageCount] = useState<number>();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (sortingColumn) {
      setSorting([{ id: sortingColumn, desc: false }]);
    }
  }, [sortingColumn]);

  //  limit
  const [limit, setLimit] = useState<number>(10);

  //  page count
  useEffect(() => {
    if (!pagination?.count) return;
    if (limit) {
      const count = Math.ceil(pagination?.count / limit);
      setPageCount(count);
      return;
    }
  }, [pagination?.count, limit]);

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: pagination
      ? {
          globalFilter: filter?.globalFilter,
          columnFilters: filter?.columnFilters,
          grouping,
          sorting,
          columnOrder,
          pagination: {
            pageIndex: pagination?.count ?? 0,
            pageSize: pagination?.count ?? 20,
          },
        }
      : {
          globalFilter: filter?.globalFilter,
          columnFilters: filter?.columnFilters,
          grouping,
          sorting,
          columnOrder,
        },

    getFilteredRowModel: getFilteredRowModel(),
    onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: filter?.setColumnFilters,
    onGlobalFilterChange: filter?.setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // ...paginationParams,
  });

  useEffect(() => {
    setTable?.(table);
    table.setPageSize(pagination?.count ?? 20);
  }, [table]);

  useEffect(() => {
    table.getHeaderGroups().map((headerGroup) =>
      headerGroup.headers.map(({ index }) => {
        columns[index]?.enablePinning && setStickyColumn(index + 1);
      }),
    );
  }, [columns, data, table]);

  return (
    <>
      {!isLoading && data.length === 0 ? (
        <Box backgroundColor="white" ml={0} mr={0} borderRadius={8}>
          <Box
            backgroundColor="gray.50"
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            height="40px"
          />
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={16}
            borderRadius={8}
          >
            <Heading size="lg">👋🏼 Oops, No data found.</Heading>
          </Stack>
        </Box>
      ) : (
        <Box
          overflowX={isLoading ? 'hidden' : 'scroll'}
          pb={2}
          css={{
            scrollbarGutter: 'stable',
            '&::-webkit-scrollbar': {
              width: '0.2rem',
              height: '0.6rem',
              position: 'absolute',
            },
            '&::-webkit-scrollbar-track': {
              position: 'absolute',
              background: `${colors.white}`,
              opacity: 0.1,
            },
            '&::-webkit-scrollbar-thumb': {
              background: `${colors.gray_100}`,
              borderRadius: 20,
            },
          }}
          borderRadius={8}
        >
          <Table bg={colors.white} fontSize={'13px'}>
            <Thead bgColor="#EDF2F7" fill="solid" bg={colors.gray_100}>
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <Tr
                  key={headerGroup.id}
                  css={{
                    [`th:nth-of-type(${stickyColumn})`]: {
                      position: 'sticky',
                      left: '-1px',
                      right: '-1px',
                      zIndex: 40,
                      boxShadow: 'inset 1px 0 0 white,inset -1px 0 0 white',
                    },
                  }}
                >
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        textTransform="capitalize"
                        whiteSpace="nowrap"
                        style={{
                          color: colors.gray_500,
                          fontSize: '13px',
                          width: `${columns[index]?.size}%` ?? header.getSize(),
                          textAlign:
                            header.id == 'Actions' ||
                            header.id == 'Action' ||
                            header.colSpan > 1
                              ? 'center'
                              : 'left',
                        }}
                      >
                        <HStack justifyContent={'space-between'}>
                          <Text
                            flex={1}
                            color={colors.gray_500}
                            fontWeight={500}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </Text>
                          {pinColumnAccess && header.id != 'S.N.' && (
                            <IconButton
                              variant="outline"
                              px={1}
                              py={1}
                              size={'small'}
                              aria-label="Minify sidebar"
                              color="inherit"
                              onClick={() => {
                                if (stickyColumn == index + 1) {
                                  setStickyColumn(null);
                                } else setStickyColumn(index + 1);
                              }}
                              ml={4}
                              bg={
                                stickyColumn == index + 1
                                  ? 'white'
                                  : 'transparent'
                              }
                            >
                              <AiOutlinePushpin />
                            </IconButton>
                          )}
                        </HStack>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={table.getHeaderGroups()[0].headers.length}>
                    <HStack justifyContent="center" pb={'144px'}>
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ) : (
                table?.getRowModel()?.rows.map((row) => (
                  <Tr
                    key={row.id}
                    css={{
                      [`td:nth-of-type(${stickyColumn})`]: {
                        position: 'sticky',
                        right: '-1px',
                        left: '-1px',
                        zIndex: 40,
                        boxShadow:
                          'inset 1px 0 0 #edf2f7,inset -1px 0 0 #edf2f7',
                      },
                      [`td:nth-of-type(${stickyColumn}) , td:not(:last-child)`]:
                        {
                          boxShadow: 'inset 1px 0 0 #edf2f7',
                        },
                    }}
                  >
                    {row?.getVisibleCells()?.map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          pl={6}
                          fontWeight={400}
                          color={colors.gray_600}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                ))
              )}
            </Tbody>
            {showFooter ? (
              <Tfoot>
                {table?.getFooterGroups()?.map((footerGroup) => (
                  <Tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <Th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Tfoot>
            ) : (
              ''
            )}
          </Table>
        </Box>
      )}
      {pagination && pagination?.count > 0 ? (
        <HStack justifyContent={'space-between'} flexWrap="wrap" mt={3}>
          <HStack>
            <FormControl
              variant={'floating'}
              display={'flex'}
              alignItems={'center'}
              columnGap={'16px'}
            >
              <FormLabel
                marginInlineStart={'5% !important'}
                marginStart={'5% !important'}
                m={0}
                fontSize={'12px'}
                color={colors.black}
              >
                Show
              </FormLabel>
              <Box position="relative">
                <Tooltip
                  label={`${tooltipLabel}`}
                  placement="top"
                  borderRadius={'20px'}
                  fontSize={'12px'}
                  boxShadow="14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
                >
                  <Select
                    icon={
                      <MdKeyboardArrowDown
                        fontSize={'0px'}
                        fontWeight={'thin'}
                      />
                    }
                    w={'57px'}
                    h={'34px'}
                    ps={'8px'}
                    border={'1px solid #E9E9E9'}
                    borderRadius={'8px'}
                    colorScheme={'purple'}
                    fontSize={'11px'}
                    cursor={'pointer'}
                    value={limit}
                    style={{
                      paddingInline: '8px',
                      textAlign: 'left',
                    }}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      pagination?.onSortChange?.(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </Select>
                </Tooltip>
              </Box>
              <Box
                position="absolute"
                right="3px"
                top="50%"
                transform="translateY(-50%)"
                zIndex={'-1'}
              >
                <MdKeyboardArrowDown fontSize={'16px'} fontWeight={'thin'} />
              </Box>
            </FormControl>
          </HStack>
          <Box className="pagination" display="flex" alignItems="center">
            <ReactPaginate
              breakLabel="..."
              previousLabel={<BiSkipPrevious size={'23px'} />}
              onPageChange={({ selected }) => {
                pagination?.onPageChange?.(selected ?? 0);
                setCurrentPage(selected);
              }}
              forcePage={currentPage}
              pageRangeDisplayed={5}
              pageCount={pageCount ?? 0}
              nextLabel={<BiSkipNext size={'23px'} />}
              renderOnZeroPageCount={null}
            />
          </Box>
        </HStack>
      ) : (
        ''
      )}
    </>
  );
}
