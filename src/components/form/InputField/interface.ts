import { InputProps } from "@chakra-ui/react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface IInputField<T extends FieldValues = FieldValues>
  extends InputProps {
  control: Control<T>;
  errors: Partial<FieldErrors<T>>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  helperText?: string;
  maxLengthInput?: number;
}
