import { colors } from "@rsces/theme/colors";
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  useController,
} from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";
import { TestContext } from "yup";
import IconWrapper from "./IconWrapper";
import SelectWrapper from "./SelectWrapper";
import reactSelectStyles from "./style";

const SingleSelect = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  options,
  isSearchable = true,

  isDisabled,
  isRequired,
  ...rest
}: SingleSelectProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const errorMessage =
    typeof error === "object"
      ? (Object.values(error)?.[0] as unknown as FieldError)
      : error;

  const { onChange, ...restFields } = field;

  return (
    <SelectWrapper
      label={label}
      error={errorMessage}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      <ReactSelect
        placeholder={placeholder}
        styles={reactSelectStyles}
        menuPlacement="auto"
        options={options}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        classNames={{
          control: () => "react-select-control",
        }}
        components={{
          IndicatorSeparator: undefined,
          DropdownIndicator: () => (
            <IconWrapper>
              <IoIosArrowDown size={18} color={colors.gray_500} />
            </IconWrapper>
          ),
        }}
        onChange={isDisabled ? undefined : onChange}
        {...restFields}
        {...rest}
      />
    </SelectWrapper>
  );
};

export default SingleSelect;

export type SingleSelectProps<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  name: FieldPath<TFieldValues>;
  options?: SelectOption<TFieldValues>;
  control: Control<TFieldValues, TestContext>;
  isSearchable?: boolean;

  isDisabled?: boolean;
  isRequired?: boolean;
};

export type SelectOption<TFieldValues extends FieldValues> = OptionsOrGroups<
  PathValue<TFieldValues, Path<TFieldValues>>,
  GroupBase<PathValue<TFieldValues, Path<TFieldValues>>>
>;
