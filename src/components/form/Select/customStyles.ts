import chakraUiTheme from "@chakra-ui/theme";
import { colors } from "@rsces/theme/colors";
import { PropsValue, StylesConfig } from "react-select";
const fontSizes = {
  sm: "12px",
  md: "14px",
  lg: "16px",
};
const paddings = {
  sm: "6px 9px",
  md: "8px 12px",
  lg: "10px 15px",
};
const px = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1rem",
};
export const customStyles: StylesConfig = {
  
  // When disabled, react-select sets the pointer-state to none
  // which prevents the `not-allowed` cursor style from chakra
  // from getting applied to the Control

  container: (
    provided,
    { selectProps: { hideContainerBorder, isSingleTimeDropdown } }
  ) => ({
    ...provided,
    pointerEvents: "auto",
    //flex: 1,
    width: isSingleTimeDropdown ? "60px" : "100%",
    borderColor: hideContainerBorder
      ? "red"
      : `${chakraUiTheme.colors.gray["200"]}`,
    minHeight: "46px",
    height: "100%",
  }),
  input: (provided, { selectProps: { size } }) => ({
    ...provided,
    color: "inherit",
    lineHeight: "inherit",
    fontSize: fontSizes[size ?? "sm"],
    height: "40px",
    overflow: "hidden",
  }),
  menu: (provided, { selectProps: { isSingleTimeDropdown } }) => ({
    ...provided,
    zIndex: 3,
    boxShadow: `0 0 0 1px ${chakraUiTheme.colors.gray["200"]}, 0 1px 1px ${chakraUiTheme.colors.gray["200"]}`,
    width: isSingleTimeDropdown ? "80px" : "100%",
    borderRadius: "6px",
  }),
  option: (provided, { selectProps: { size } }) => ({
    ...provided,
    fontSize: fontSizes[size ?? "sm"],
  }),
  control: (
    provided,
    {
      selectProps: { isSingleTimeDropdown, inheritControlBG },
      isDisabled,
      isFocused,
    }
  ) => ({
    ...provided,
    "&:focus": {
      boxShadow: "1px 1px 1px 2px #d00101",
    },
    boxShadow: isFocused ? `0px 0px 0px 2px ${colors.primary}` : "none",
    border: isFocused ? "none" : "1px solid transparent",
    borderRadius: "6px",
    background: isSingleTimeDropdown
      ? `${chakraUiTheme.colors.gray["100"]}`
      : "inherit",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      margin: "0 0.8rem",
      borderBottom: isFocused ? "0px solid #80808052" : "1px solid #80808052",
      transition: "all 0.1s linear",
    },
    "&:hover::before": {
      borderRadius: "6px",
      border: isFocused ? "0px solid #80808052" : "1px solid #80808052",
      margin: "0",
    },
    ...(isDisabled && inheritControlBG ? { backgroundColor: "inherit" } : {}),
    "&:hover": {
      // border: "1px solid",
      // borderColor: "#80808052",
      // borderRadius: "6px",
      backgroundColor: isSingleTimeDropdown
        ? `${chakraUiTheme.colors.gray["100"]}`
        : "inherit",

      ...(isDisabled
        ? {
            cursor: "not-allowed",
            backgroundColor: "gray.100",
          }
        : {}),
      "&:focus": {
        borderColor: "red",
        boxShadow: "0 0 0 1px gray",
        backgroundColor: isSingleTimeDropdown
          ? `${chakraUiTheme.colors.gray["100"]}`
          : "inherit",
        ...(isDisabled
          ? {
              cursor: "not-allowed",
              backgroundColor: "gray.100",
            }
          : {}),
      },
    },
    //borderRadius: hasInputAddon ? "0px 6px 6px 0px" : "6px",
    flex: 1,
  }),
  dropdownIndicator: (provided, { selectProps: { hideDropdownArrow } }) => {
    if (hideDropdownArrow) {
      return {
        display: "none",
      };
    } else {
      return { ...provided };
    }
  },
  clearIndicator: provided => ({
    ...provided,
    zIndex: 1,
  }),
  singleValue: (provided, { isDisabled }) => ({
    ...provided,
    opacity: "0.7 !important",
    color: isDisabled ? `${colors.black} !important` : "inherit",
  }),
  valueContainer: (
    provided,
    {
      selectProps: {
        size,
        formatOptionLabel,
        disableLeftPaddingInValueContainer,
        value,
        isMulti,
      },
    }
  ) => {
    let padding = `0.125rem ${px[size ?? "sm"]}`;
    if (
      formatOptionLabel && isMulti ? (value as PropsValue<any>)?.length : value
    ) {
      padding = `0.125rem ${px[size ?? "sm"]}`;
    }
    if (disableLeftPaddingInValueContainer) {
      padding = `0.41rem 0 0.41rem 0.25rem`;
    }
    return {
      ...provided,
      padding,
      fontSize: `${fontSizes[size ?? "sm"]}`,
      overflow: "visible",
    };
  },
  placeholder: (provided, state) => ({
    ...provided,
    color: "grey",
    display:
      state.isFocused || state.hasValue || state.selectProps.inputValue
        ? "none"
        : "block",
  }),
  multiValueRemove: (
    provided,
    { selectProps: { disableMultiValueRemove }, isDisabled }
  ) => ({
    ...provided,
    ...(isDisabled && disableMultiValueRemove
      ? {
          visibility: "hidden",
          width: "4px",
        }
      : {}),
  }),
  multiValue: (
    provided,
    { selectProps: { hasInputAddon, hideSelectedValues, inheritMultiValueBG } }
  ) =>
    hasInputAddon
      ? {
          ...provided,
          borderRadius: "6px",
          backgroundColor: inheritMultiValueBG ? "inherit" : "#F1F3F6",
          padding: "4px 8px",
        }
      : hideSelectedValues
      ? { ...provided, display: "none" }
      : { ...provided },
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: provided => ({
    ...provided,
    color: chakraUiTheme.colors.gray["200"],
    marginRight: "0.7rem",
    "&:hover": {
      color: chakraUiTheme.colors.gray["200"],
    },
  }),
  loadingMessage: (provided, { selectProps: { size } }) => {
    return {
      ...provided,
      fontSize: fontSizes[size ?? "sm"],
      padding: paddings[size ?? "sm"],
    };
  },
};
