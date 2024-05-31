import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

const SelectWrapper = ({
  error,
  label,
  children,
  isRequired,
  isDisabled,
}: SelectWrapperProps) => {
  const errorMessage = error?.message

  return (
    <FormControl isInvalid={!!error} isDisabled={isDisabled}>
      <VStack
        gap={2}
        alignItems={'stretch'}
        userSelect={isDisabled ? 'none' : 'auto'}
        cursor={isDisabled ? 'not-allowed' : 'default'}
        sx={{
          '.react-select-control': {
            border: '1px solid',
            borderColor: errorMessage ? 'error.500' : 'grey.1300',
            opacity: isDisabled ? 0.4 : 0.8,
            backgroundColor: isDisabled ? 'disabled' : '',
          },
          '~ .chakra-form__error-message': {
            opacity: 0.8,
          },

          _hover: {
            label: {
              opacity: isDisabled ? 0.4 : 1,
            },
            '~ .chakra-form__error-message': {
              opacity: 1,
            },

            '.react-select-control': {
              borderColor: errorMessage
                ? 'error.500'
                : isDisabled
                  ? 'grey.700'
                  : 'grey.900',
              opacity: isDisabled ? 0.4 : 1,
            },
          },
        }}
      >
        {label && (
          <FormLabel
            marginBottom={0}
            lineHeight={6}
            opacity={0.8}
            cursor={isDisabled ? 'not-allowed' : 'default'}
          >
            {label}
            {isRequired ? (
              <Text as={'span'} color={'secondary.500'}>
                {' '}
                *
              </Text>
            ) : (
              ''
            )}
          </FormLabel>
        )}
        <Box>{children}</Box>
      </VStack>

      {errorMessage && (
        <FormErrorMessage marginTop={1} color={'error.500'}>
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export default SelectWrapper

type SelectWrapperProps = {
  label?: string
  children: React.ReactNode
  helperText?: string
  error?: FieldError
  shouldApplyOpacity?: boolean

  isRequired?: boolean
  isDisabled?: boolean
}
