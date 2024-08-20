import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { FieldValues, useController } from "react-hook-form";
import { ITextarea } from "./interface";
import { Textarea as ChakraTextarea } from "@chakra-ui/react";

const Textarea = <T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  control,
  ...rest
}: ITextarea<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <FormControl mt={2} isInvalid={!!error}>
      <FormLabel fontSize={"sm"}>{label}</FormLabel>
      <ChakraTextarea
        placeholder={placeholder}
        resize={"none"}
        minH={"150px"}
        borderColor={"gray.400"}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default Textarea;
