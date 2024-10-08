import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "../colors";

export const Button = defineStyleConfig({
  baseStyle: {
    fontSize: "14px",
    borderRadius: "12px",
    px: 6,
    py: 4,
  },
  variants: {
    primary: {
      bg: colors.primary,
      color: colors.gray_100,
      border: `1px solid ${colors.primary}`,
      _hover: {
        bg: "green.700",
        border: `1px solid ${colors.primary}`,
      },
    },
    outline: {
      bg: colors.gray_100,
      color: colors.primary,
      border: `1px solid`,
      borderColor: colors.primary,
      _hover: {
        bg: colors.primary,
        color: colors.gray_100,
      },
      _active: {
        bg: colors.primary,
        opacity: 0.8,
      },
    },
    solid: {
      bg: colors.primary,
      color: colors.gray_100,
      _hover: {
        bg: colors.primary,
        color: colors.gray_100,
        opacity: 0.8,
      },
      _active: {
        bg: colors.primary,
        color: colors.gray_100,
        opacity: 0.8,
      },
    },
    edit: {
      bg: colors.gray_500,
      color: colors.gray_100,
      _hover: {
        bg: colors.gray_700,
        color: colors.gray_100,
      },
    },
    edit2: {
      bg: colors.primary,
      color: colors.gray_100,
      _hover: {
        bg: colors.gray_700,
        color: colors.gray_100,
      },
    },
    delete: {
      bg: colors.delete,
      color: colors.gray_100,
      _hover: {
        bg: colors.red,
        color: colors.gray_100,
        opacity: 0.8,
      },
      _active: {
        bg: colors.delete,
        color: colors.gray_100,
        opacity: 0.8,
      },
    },
    primaryInverted: {
      bg: colors.gray_100,
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      _hover: {
        bg: colors.primary,
        color: colors.gray_100,
        border: `1px solid ${colors.primary}`,
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
});
