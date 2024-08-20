import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@rsces/components/DataTable";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";
import ModalForm from "@rsces/components/Modal/modalForm";
import Dropzone, { FileWithPreview } from "@rsces/components/form/Dropzone";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import { useFileFromUrl } from "@rsces/service/service-file";
import {
  IBlogs,
  useBlogs,
  useCreateBlogs,
  useDeleteBlogs,
  useEditBlogs,
} from "@rsces/service/service-blogs";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { toFormData } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import SearchBar from "../Layout/SearchBar";

const defaultValues = {
  title: "",
  image: null as unknown as FileWithPreview[],
  description: "",
  date: "",
};

const schema = yup.object().shape({
  title: yup.string().required("Name is required"),
  image: yup.mixed<FileWithPreview[]>().required("Image is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
});

const AdminBlogs = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { data: blogsData, isLoading } = useBlogs();
  const [searchFilterData, setSearchFilterData] = useState("");
  const columnFilters: ColumnFiltersState = [];
  const [deleteId, setDeleteId] = useState<number | null>(null);
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }
  const { mutate: deleteBlog } = useDeleteBlogs();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const columnHelper = createColumnHelper<IBlogs>();
  const [rowId, setRowId] = useState<number | null>(null);
  const { mutate: createBlog, isPending: isCreatingBlog } = useCreateBlogs();
  const { mutate: editBlog, isPending: isEditingBlog } = useEditBlogs();

  const [imageUrl, setImageUrl] = useState("");
  const {
    data: imageFile,
    isLoading: isImageFileLoading,
    isFetching: isImageFileFetching,
  } = useFileFromUrl(imageUrl);

  useEffect(() => {
    if (!imageFile) return;

    const file = Object.assign(imageFile, {
      preview: URL.createObjectURL(imageFile),
    });

    setValue("image", [file]);
  }, [imageFile, setValue]);

  const onDelete = () => {
    if (deleteId) {
      // Delete product
      deleteBlog(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          onClose();
        },
      });
    }
  };

  //Create Product on modal button submit
  const onSubmitAdd = (data: typeof defaultValues) => {
    const formdata = toFormData(data, undefined, {
      indexes: null,
    });
    createBlog(formdata, {
      onSuccess: () => {
        onAddClose();
        reset(defaultValues);
      },
    });
  };
  const onSubmitEdit = (data: typeof defaultValues) => {
    const formdata = toFormData(data, undefined, {
      indexes: null,
    });
    rowId &&
      editBlog(
        { id: rowId, data: formdata },
        {
          onSuccess: () => {
            onEditClose();
            reset(defaultValues);
            setRowId(null);
          },
        },
      );
  };

  const blogsColumn = useMemo(
    () => [
      columnHelper.display({
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor("title", {
        header: "Title",
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: ({ row }) => <Text maxW={56}>{row.original.description}</Text>,
      }),
      columnHelper.accessor("image", {
        header: "Image",
        cell: ({ row }) => (
          <Image src={row.original.image} alt={row.original.title} h={40} />
        ),
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: ({ row }) => <p>{new Date(row.original.date).toDateString()}</p>,
      }),
      columnHelper.accessor("id", {
        header: "Actions",
        cell: ({ row }) => (
          <HStack spacing={0}>
            <IconButton
              p={0}
              variant={"ghost"}
              aria-label="Edit Donation"
              icon={<EditIcon />}
              onClick={() => {
                setRowId(row.original.id);
                setImageUrl(row.original.image);
                reset({
                  title: row.original.title,
                  description: row.original.description,
                  date: new Date(row.original.date).toISOString().split("T")[0],
                });
                onEditOpen();
              }}
            />
            <IconButton
              variant={"ghost"}
              aria-label="Delete Donation"
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => {
                setDeleteId(row.original.id);
                onOpen();
              }}
            />
          </HStack>
        ),
      }),
    ],
    [columnHelper, onOpen, reset, onEditOpen],
  );
  const formFields = (
    <>
      <InputField
        control={control}
        name="title"
        label="Title"
        placeholder="Enter Blog Title"
        errors={errors}
      />

      <GridItem rowSpan={3}>
        <Dropzone
          control={control}
          name="image"
          isLoading={isImageFileLoading || isImageFileFetching}
        />
      </GridItem>
      <InputField
        control={control}
        type="date"
        name="date"
        label="Date"
        placeholder="Enter Blog Date"
        errors={errors}
      />
      <Textarea
        control={control}
        name="description"
        label="Description"
        placeholder="Enter Blog Description"
      />
    </>
  );
  return (
    <>
      <Flex justify={"space-between"} align={"center"} my={8}>
        <SearchBar getFilterData={searchFilterDataProp} />
        <Button
          colorScheme="facebook"
          variant="solid"
          leftIcon={<IoMdAdd />}
          onClick={onAddOpen}
        >
          Add Blog
        </Button>
      </Flex>
      <DataTable
        columns={blogsColumn}
        data={blogsData ?? []}
        filter={{
          globalFilter: searchFilterData,
          columnFilters: columnFilters,
        }}
        isLoading={isLoading}
        rowSize={40}
      />
      {/* Delete Confirmation Modal */}
      <ConfirmationModel
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onDelete}
      />
      <ModalForm
        isOpen={isAddOpen}
        onClose={() => {
          onAddClose();
          reset(defaultValues);
          setImageUrl("");
        }}
        title={"Add Blogs"}
        size={{ base: "full", md: "3xl" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmitAdd)}
        isSubmitting={isCreatingBlog}
      >
        <Grid templateColumns="repeat(2, 1fr)" rowGap={2} columnGap={8}>
          {formFields}
        </Grid>
      </ModalForm>
      <ModalForm
        isOpen={isEditOpen}
        onClose={() => {
          onEditClose();
          reset(defaultValues);
          setImageUrl("");
          setRowId(null);
        }}
        title={"Edit Blog"}
        size={{ base: "full", md: "3xl" }}
        buttonLabel={"Update"}
        onSubmit={handleSubmit(onSubmitEdit)}
        isSubmitting={isEditingBlog}
      >
        <Grid templateColumns="repeat(2, 1fr)" rowGap={2} columnGap={8}>
          {formFields}
        </Grid>
      </ModalForm>
    </>
  );
};

export default AdminBlogs;
