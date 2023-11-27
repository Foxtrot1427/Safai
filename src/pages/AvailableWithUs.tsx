import { Box, Text } from '@chakra-ui/react';
import { colors } from '@rsces/theme/colors';

const AvailableWithUs = () => {
  return (
    <Box as={'section'} h={'400px'}>
      <Box
        w={'50%'}
        h={'inherit'}
        mx={'auto'}
        bgColor={colors.primary}
        opacity={0.5}
        color={colors.white}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Text textTransform={'uppercase'} align={'center'} fontSize={'2xl'}>
          You can order online
        </Text>
        <Text
          textTransform={'uppercase'}
          align={'center'}
          fontSize={'5xl'}
          fontWeight={'bold'}
        >
          Available with us
        </Text>
      </Box>
    </Box>
  );
};

export default AvailableWithUs;
