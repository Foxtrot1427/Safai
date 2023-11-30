import { Text } from '@chakra-ui/react';
import Wrapper from '@rsces/components/ui/Wrapper';

const AvailableWithUs = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default AvailableWithUs;
