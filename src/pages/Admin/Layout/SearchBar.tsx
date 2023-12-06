import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { colors } from '@rsces/theme/colors';
import { useCallback } from 'react';
import { CiSearch } from 'react-icons/ci';
import { debounce } from 'lodash';

const SearchBar = ({
  getFilterData,
}: {
  getFilterData: (childData: string) => void;
}) => {
  const handleSearchChange = useCallback(
    debounce((value) => {
      getFilterData(value);
    }, 1000),
    [],
  );

  return (
    <HStack spacing={3}>
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
          onChange={({ target: { value } }) => handleSearchChange(value)}
        />
      </InputGroup>
    </HStack>
  );
};

export default SearchBar;
