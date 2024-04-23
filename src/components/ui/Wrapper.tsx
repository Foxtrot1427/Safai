import { Box } from '@chakra-ui/react';
import { colors } from '@rsces/theme/colors';
import { PropsWithChildren } from 'react';

interface WrapperProps extends PropsWithChildren {
  bannerImg?: string;
  py?: number;
}

const Wrapper = ({ bannerImg, children, py  }: WrapperProps) => {
  return (
    <Box
      as={'section'}
      position={'relative'}
      py={py ?? 80}
      bgImage={bannerImg}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      _after={{
        position: 'absolute',
        zIndex: 10,
        top: 0,
        content: '""',
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(to right, ${colors.primary}, transparent)`,
        opacity: 0.5,
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
