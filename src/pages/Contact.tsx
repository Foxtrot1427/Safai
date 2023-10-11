import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { colors } from '@rsces/theme/colors';

const Contact = () => {
  return (
    <>
      {/* Banner */}
      <Box
        position={'relative'}
        h={'400px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        background={colors.primary}
        opacity={0.5}
      >
        <Box textAlign={'center'}>
          <Text
            textTransform={'uppercase'}
            fontSize={'2xl'}
            color={colors.white}
          >
            Our Corporate Location
          </Text>
          <Text
            textTransform={'uppercase'}
            color={colors.white}
            fontSize={'5xl'}
            fontWeight={'bold'}
          >
            Collection Center
          </Text>
        </Box>
      </Box>

      <Flex w={'60%'} mx={'auto'} py={24}>
        {[
          {
            id: 1,
            icon: '',
            values: ['Kausaltar, Balkot Road,', 'Madhyapur Thimi, Bhaktapur'],
          },
          {
            id: 2,
            icon: '',
            values: ['+977 01 4454785', '+977 9841007351'],
          },
          {
            id: 3,
            icon: '',
            values: ['sales@rsces.com.np'],
          },
        ].map((item) => (
          <VStack key={item.id} flex={1}>
            <Circle size={48} background={colors.primary}></Circle>
            <VStack mt={2} spacing={0}>
              {item.values.map((value) => (
                <Text key={value}>{value}</Text>
              ))}
            </VStack>
          </VStack>
        ))}
      </Flex>
    </>
  );
};

export default Contact;
