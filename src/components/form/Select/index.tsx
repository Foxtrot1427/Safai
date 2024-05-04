import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { colors } from "@rsces/theme/colors";
import { Control, Controller } from "react-hook-form";
import { GroupBase, Props, default as ReactSelect } from "react-select";
import { customStyles } from "./customStyles";

declare module "react-select" {
  export interface Props<
    Option,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    IsMulti extends boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Group extends GroupBase<Option>,
  > {
    size?: "sm" | "md" | "lg";
    /** If the Select Component has Custom Label Component */
    helperText?: string;
    hasInputAddon?: boolean;
    hideDropdownArrow?: boolean;
    hideSelectedValues?: boolean;
    hideContainerBorder?: boolean;
    isSingleTimeDropdown?: boolean;
    disableLeftPaddingInValueContainer?: boolean;
    isParticipantGroupContainer?: boolean;
    inheritMultiValueBG?: boolean;
    disableMultiValueRemove?: boolean;
    inheritControlBG?: boolean;
    isFocused?: boolean;
  }
}
type SelectProps = Props & {
  size?: "sm" | "md" | "lg";
  name: string;
  control?: Control<any>;
  nonControlled?: boolean;
  asyncSelect?: boolean;
  required?: boolean;
  isRequired?: boolean;
  isCreatable?: boolean;
  isReadOnly?: boolean;
  label?: string;
  labelWidth?: string;
  promiseOptions: (inputValue: string) => void;
};

function SelectComponent({
  size = "sm",
  label,
  control,
  required,
  name,
  value: propsValue,
  hideError = true,
  isMulti,
  isRequired,
  helperText,
  placeholder,
  disabled,
  onCustomChange,
  onChange,
  ...args
}: SelectProps) {
  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <Box
            width="100%"
            sx={{
              "&>div>div>div:nth-of-type(1)>div": {
                paddingY: "1px !important",
              },
              "&>div>div>div:nth-of-type(1)>div>div:nth-of-type(2)": {
                margin: 0,
                padding: 0,
              },
            }}
          >
            <FormControl
              variant="floating"
              id={name}
              isInvalid={!!error}
              isRequired={isRequired}
            >
              {label && (
                <FormLabel
                  htmlFor={name}
                  fontSize={"14px"}
                  color={colors?.black}
                  // fontFamily={"Roboto"}
                >
                  {label}
                  {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                </FormLabel>
              )}
              <ReactSelect
                name={name}
                onChange={e => {
                  onChange(e);
                  if (onCustomChange !== undefined) {
                    onCustomChange({ e: e, name: name });
                  }
                }}
                onBlur={onBlur}
                value={propsValue ?? value ?? ""}
                isDisabled={disabled}
                placeholder={placeholder}
                styles={{
                  ...customStyles,
                }}
                size={size}
                isMulti={isMulti}
                isClearable
                ref={ref}
                {...args}
              />
              <FormErrorMessage fontSize={"12px !important"} ml={"15px"}>
                {hideError ? "" : (error as any)?.message}
                {/* {error?.message} */}
              </FormErrorMessage>
              {helperText ? (
                <FormHelperText>
                  <Alert status="warning">
                    <AlertIcon />
                    {helperText}
                  </Alert>
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </Box>
        );
      }}
    />
  );
}

export default SelectComponent;
