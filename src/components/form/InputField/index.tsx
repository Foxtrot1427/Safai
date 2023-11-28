import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { colors } from '@rsces/theme/colors';
import { IInputField } from './interface';

const CustomInput = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  props: IInputField<T>;
}) => {
  const { name, placeholder = ' ', type = 'text', ...otherProps } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  if (props.type === 'password') {
    return (
      <Flex flexDirection={'column'}>
        <FormLabel
          color={colors.black}
          htmlFor={name}
          fontSize={'sm'}
          fontWeight={400}
        >
          {props.label}
        </FormLabel>

        <InputGroup>
          <Input
            id={name}
            placeholder={placeholder}
            fontSize={'sm'}
            {...field}
            {...otherProps}
            type={passwordVisible ? 'text' : type}
            _placeholder={{ color: colors.gray_700, fontSize: 'sm' }}
            border={'1px solid'}
            borderColor={'gray.400'}
          />

          {passwordVisible ? (
            <InputRightElement>
              <Icon
                fontSize={'24px'}
                color="blackAlpha.500"
                cursor={'pointer'}
                as={MdOutlineVisibility}
                onClick={togglePasswordVisibility}
              ></Icon>
            </InputRightElement>
          ) : (
            <InputRightElement>
              <Icon
                fontSize={'24px'}
                cursor={'pointer'}
                color={'gray.400'}
                as={MdOutlineVisibilityOff}
                onClick={togglePasswordVisibility}
              ></Icon>
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>
    );
  }

  return (
    <Flex flexDirection={'column'} borderColor={'gray.400'}>
      <FormLabel
        color={colors.black}
        htmlFor={name}
        fontSize={'sm'}
        fontWeight={400}
      >
        {props.label}
      </FormLabel>

      <Input
        id={name}
        placeholder={placeholder}
        fontSize={'sm'}
        {...field}
        type={type}
        variant="outline"
        {...otherProps}
        _placeholder={{ color: colors.gray_700, fontSize: 'sm' }}
      />
    </Flex>
  );
};

const InputField = <T extends FieldValues = FieldValues>(
  props: IInputField<T>,
) => {
  const { errors, name, control, helperText } = props;

  return (
    <FormControl isInvalid={!!errors?.[name]}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <CustomInput field={field} props={props}></CustomInput>
              <FormHelperText>{helperText}</FormHelperText>
              <FormErrorMessage mb={1}>
                {' '}
                {error && error?.message}
              </FormErrorMessage>
            </>
          );
        }}
      />
    </FormControl>
  );
};

export default InputField;
