import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

// const formVariants = {
//   floating: "floating",
// } as const;

const StepperSelectWrapper = ({
  error,
  label,
  helperText,
  children,
  shouldApplyOpacity = false,
  isRequired,
  isDisabled,
  hasValue,
  ...rest
}: FormWrapperProps) => {
  const errorMessage = error?.message;

  return (
    <FormControl
      as={VStack}
      alignItems={"stretch"}
      gap={0}
      userSelect={isDisabled ? "none" : "auto"}
      cursor={isDisabled ? "not-allowed" : "default"}
      opacity={shouldApplyOpacity ? 0.8 : 1}
      _focusWithin={{
        opacity: 1,
        "&>div>label": {
          transform: "translateY(-15px)",
        },

        _disabled: {
          opacity: 0.8,
        },
      }}
      _hover={{
        opacity: undefined,
        _disabled: {
          opacity: 0.8,
        },
      }}
      isInvalid={!!error && !isDisabled}
      isDisabled={isDisabled}
      {...rest}
    >
      <Flex flexDir={"column"} position="relative">
        {children}

        {label && (
          <FormLabel
            marginTop={0}
            marginBottom={1}
            lineHeight={6}
            cursor={isDisabled ? "not-allowed" : "default"}
            {...(hasValue && {
              transform: "scale(0.85) translateY(-15px)",
            })}
            sx={{
              top: "9%",
              left: 0,
              position: "absolute",
              backgroundColor: "transparent",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
              fontSize: "14px",
            }}
          >
            {label}{" "}
            {isRequired ? (
              <Text as={"span"} color={"secondary.500"}>
                *
              </Text>
            ) : (
              ""
            )}
          </FormLabel>
        )}
      </Flex>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      {errorMessage && (
        <FormErrorMessage marginTop={1} color={"error.500"}>
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default StepperSelectWrapper;

type FormWrapperProps = {
  label?: string;
  children: React.ReactNode;
  helperText?: string;
  error?: FieldError;
  shouldApplyOpacity?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  hasValue: boolean;
};
