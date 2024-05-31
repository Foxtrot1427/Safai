import { colors } from "@rsces/theme/colors";
import { StylesConfig } from 'react-select'

const reactSelectStyles: StylesConfig = {
  container: baseStyles => ({
    ...baseStyles,
    height: '100%',
    maxHeight: '42px',
    fontSize: '14px',
    border: 0,
  }),

  control: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    height: '100%',
    padding: '0 !important',
    boxShadow: 'none',
    borderRadius: '0',
    border: '0 !important',
    borderBottom: isFocused
      ? `1px solid ${colors.primary} !important`
      : `1px solid ${colors.gray_500} !important`,
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    paddingLeft: 0,
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    color: colors.gray_500,
    fontSize: '16px',
  }),
  singleValue: baseStyle => ({
    ...baseStyle,
    fontSize: '16px',
  }),
  input: baseStyle => ({
    ...baseStyle,
    fontSize: '16px',
  }),
  indicatorsContainer: baseStyles => ({
    ...baseStyles,
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  menu: baseStyles => ({
    ...baseStyles,
    zIndex: 2,
  }),
  option: (baseStyles, { isSelected, isFocused }) => ({
    ...baseStyles,
    fontSize: '16px',
    color: isSelected || isFocused ? colors.primary : colors.black,
    backgroundColor: isSelected || isFocused ? colors.gray_200 : undefined,
    cursor: 'pointer',
    '&:active, &:hover': {
      backgroundColor: colors.gray_200,
    },
    '&:visited': {
      backgroundColor: 'transparent !important',
    },
  }),
}

export default reactSelectStyles
