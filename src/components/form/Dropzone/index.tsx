import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, Path, Control, useController } from "react-hook-form";
import "./index.css";
import {
  Box,
  FormControl,
  FormLabel,
  Image,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { colors } from "@rsces/theme/colors";

export interface FileWithPreview extends File {
  preview: string;
}

interface DropzoneProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  isLoading?: boolean;
}

const Dropzone = <T extends FieldValues>({
  name,
  control,
  isLoading,
}: DropzoneProps<T>) => {
  const { field } = useController({
    name,
    control,
  });

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      field.onChange(files);
    },
  });

  const thumbs =
    Array.isArray(field.value) &&
    field.value.map((file: FileWithPreview) => (
      <ListItem key={file.name} flex={1} listStyleType="none">
        <Image
          src={file.preview}
          height="100%"
          maxHeight="200px"
          mx="auto"
          aspectRatio={1}
          objectFit="contain"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </ListItem>
    ));

  useEffect(() => {
    return () =>
      Array.isArray(field.value) &&
      field.value?.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview),
      );
  }, [field.value]);

  return (
    <FormControl>
      <FormLabel
        color={colors.black}
        htmlFor={name}
        fontSize="sm"
        fontWeight={400}
      >
        Image
      </FormLabel>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input name={field.name} ref={field.ref} {...getInputProps()} />
        <Text fontSize="sm" fontWeight="semibold" maxW="70%" textAlign="center">
          Drag 'n' drop some files here, or click to select files
        </Text>
      </Box>
      {isLoading ? (
        <VStack height="200px" align="center" justify="center">
          <Spinner />
        </VStack>
      ) : (
        <UnorderedList
          display="flex"
          gap={5}
          justifyContent="center"
          m={0}
          mt={4}
          flexWrap="wrap"
        >
          {thumbs}
        </UnorderedList>
      )}
    </FormControl>
  );
};

export default Dropzone;
