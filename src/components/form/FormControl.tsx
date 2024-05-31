import { FieldValues } from "react-hook-form";
// import Input, { InputProps } from './Input'
import SingleSelect, { SingleSelectProps } from "./ReactSelect/SingleSelect";

const FormControl = <TFieldValues extends FieldValues>({
  inputControl,
  ...rest
}: FormControlProps<TFieldValues>) => {
  switch (inputControl) {
    case "select":
      return <SingleSelect {...(rest as SingleSelectProps<TFieldValues>)} />;
    default:
      return null;
  }
};

export default FormControl;

export type InputControlTypes = "input" | "select" | "date" | "stepperSelect";

export type FormControlProps<TFieldValues extends FieldValues> = {
  inputControl: InputControlTypes;
} & SingleSelectProps<TFieldValues>;
