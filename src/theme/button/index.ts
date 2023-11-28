import { defineStyleConfig } from '@chakra-ui/react';
import { colors } from '../colors';

export const Button = defineStyleConfig({
  baseStyle: {
    fontSize: '14px',
    borderRadius: '12px',
    px: 6,
    py: 4,
  },
  variants: {
    primary: {
      bg: colors.primary,
      color: colors.gray_100,
      _hover: {
        bg: colors.gray_100,
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
});
