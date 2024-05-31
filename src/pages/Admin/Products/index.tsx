import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
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
  IProduct,
  useCreateProduct,
  useDeleteProduct,
  useEditProduct,
  useProducts,
} from "@rsces/service/service-products";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { toFormData } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { GrView } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import SearchBar from "../Layout/SearchBar";

const defaultValues = {
  name: "",
  image: null as unknown as FileWithPreview[],
  price: "",
  description: "",
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.string().required("Price is required"),
  image: yup.mixed<FileWithPreview[]>().required("Image is required"),
  description: yup.string().required("Description is required"),
});

const AdminProducts = () => {
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
  const { data: productData, isLoading } = useProducts();
  const [searchFilterData, setSearchFilterData] = useState("");
  const columnFilters: ColumnFiltersState = [];
  const [deleteId, setDeleteId] = useState<number | null>(null);
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }
  const { mutate: deleteProduct } = useDeleteProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

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
  const columnHelper = createColumnHelper<IProduct>();
  const [rowId, setRowId] = useState<number | null>(null);
  const { mutate: createProduct, isPending: isCreatingProduct } =
    useCreateProduct();
  const { mutate: editProduct, isPending: isEditingProduct } = useEditProduct();

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
      deleteProduct(deleteId, {
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
    createProduct(formdata, {
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
      editProduct(
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

  const productsColumns = useMemo(
    () => [
      columnHelper.display({
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("price", {
        header: "Price",
      }),
      columnHelper.accessor("interests", {
        header: "Interest",
        cell: ({ row }) => row.original.interests.length || 0,
      }),
      columnHelper.accessor("image", {
        header: "Image",
        cell: ({ row }) => (
          <Image src={row.original.image} alt={row.original.name} h={8} />
        ),
      }),
      columnHelper.accessor("admin", {
        header: "Created by",
        cell: ({ row }) => row.original.admin.name,
      }),
      columnHelper.accessor("interest", {
        header: "View Interest",
        cell: ({ row }) => (
          <>
            <IconButton
              variant={"ghost"}
              aria-label="Show Interest"
              icon={<GrView />}
              onClick={() => {
                setRowId(row.original.id);
                onDrawerOpen();
              }}
            />
          </>
        ),
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
                  name: row.original.name,
                  price: row.original.price,
                  description: row.original.description,
                });
                onEditOpen();
              }}
            />
            <IconButton
              variant={"ghost"}
              aria-label="Delete Donation"
              icon={<DeleteIcon />}
              onClick={() => {
                setDeleteId(row.original.id);
                onOpen();
              }}
            />
          </HStack>
        ),
      }),
    ],
    [columnHelper, onAddOpen, onDrawerOpen, onOpen, reset],
  );
  const formFields = (
    <>
      <InputField
        control={control}
        name="name"
        label="Name"
        placeholder="Enter product name"
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
        name="price"
        label="Price"
        placeholder="Enter product price"
        errors={errors}
      />
      <Textarea
        control={control}
        name="description"
        label="Description"
        placeholder="Enter Product Description"
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
          Add Product
        </Button>
      </Flex>
      <DataTable
        columns={productsColumns}
        data={productData ?? []}
        filter={{
          globalFilter: searchFilterData,
          columnFilters: columnFilters,
        }}
        isLoading={isLoading}
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
        title={"Add Product"}
        size={{ base: "full", md: "3xl" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmitAdd)}
        isSubmitting={isCreatingProduct}
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
        title={"Edit Product"}
        size={{ base: "full", md: "3xl" }}
        buttonLabel={"Update"}
        onSubmit={handleSubmit(onSubmitEdit)}
        isSubmitting={isEditingProduct}
      >
        <Grid templateColumns="repeat(2, 1fr)" rowGap={2} columnGap={8}>
          {formFields}
        </Grid>
      </ModalForm>

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              onDrawerClose();
              setRowId(null);
            }}
          />
          <DrawerHeader fontSize={24}>Interests</DrawerHeader>
          <DrawerBody>
            <VStack align={"normal"}>
              {productData
                ?.find(product => product.id === rowId)
                ?.interests.map(interest => (
                  <VStack key={interest.id} alignItems={"flex-start"} mb={8}>
                    <Text>
                      <b>Name:</b> {interest.name}
                    </Text>
                    <Text>
                      <b>Number:</b> {interest.number}
                    </Text>
                    <Text>
                      <b>Description:</b> {interest.description}
                    </Text>
                    <Divider mt={4} borderWidth={1} />
                  </VStack>
                ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminProducts;
