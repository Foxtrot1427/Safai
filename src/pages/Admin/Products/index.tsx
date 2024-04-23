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
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "@rsces/components/DataTable";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";
import {
  IProduct,
  useCreateProduct,
  useDeleteProduct,
  useProducts,
} from "@rsces/service/service-products";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "../Layout/SearchBar";
import { IoMdAdd } from "react-icons/io";
import ModalForm from "@rsces/components/Modal/modalForm";
import InputField from "@rsces/components/form/InputField";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { toFormData } from "axios";
import { GrView } from "react-icons/gr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFileFromUrl } from "@rsces/service/service-file";

const defaultValues = {
  name: "",
  image: null as unknown as File,
  price: "",
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.string().required("Price is required"),
  image: yup.mixed<File>().required("Image is required"),
});
const AdminProducts = () => {
  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  console.log(getValues());
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
  const columnHelper = createColumnHelper<IProduct>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [rowId, setRowId] = useState<number | null>(null);
  const { mutate: createProduct } = useCreateProduct();

  const [imageUrl, setImageUrl] = useState("");
  const { data: imageFile } = useFileFromUrl(imageUrl);
  console.log(imageFile, "abc");

  useEffect(() => {
    if (!imageFile) return;

    console.log("hello");

    setValue("image", imageFile);
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
  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);
    const formdata = toFormData(data, undefined, {
      indexes: null,
    });
    createProduct(formdata);
    reset(defaultValues);
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
                setImageUrl(row.original.image);
                reset({
                  name: row.original.name,
                  price: row.original.price,
                });
                onAddOpen();
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
    [columnHelper, onOpen],
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
        }}
        title={"Add Product"}
        size={{ base: "full", md: "lg" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <>
          <InputField
            control={control}
            name="name"
            label="Name"
            placeholder="Enter product name"
            errors={errors}
          />
          <InputField
            control={control}
            name="price"
            label="Price"
            placeholder="Enter product price"
            errors={errors}
          />
          <Flex>
            <FormControl h={"full"}>
              <Input
                type="file"
                display={"none"}
                {...register("image")}
                ref={e => {
                  register("image").ref(e);
                  imageRef.current = e;
                }}
                onChange={e => {
                  if (!e.target.files) return;
                  setValue("image", e.target.files?.[0]);
                }}
              />
              <FormLabel fontSize={"sm"}>Item (Image)</FormLabel>
              <Button
                width={"full"}
                variant={"outline"}
                onClick={() => imageRef.current?.click()}
              >
                <HStack spacing={2}>
                  <BsUpload />
                  <Text>Upload</Text>
                </HStack>
              </Button>
              {watch("image") && (
                <Image
                  src={
                    watch("image")
                      ? URL.createObjectURL(watch("image") || "")
                      : ""
                  }
                  alt="Item image"
                  h={48}
                  mt={2}
                  mx={"auto"}
                />
              )}
            </FormControl>
          </Flex>
        </>
      </ModalForm>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onDrawerClose} />
          <DrawerHeader fontSize={24}>Interests</DrawerHeader>
          <DrawerBody>
            <VStack align={"normal"}>
              {productData
                ?.find(product => product.id === rowId)
                ?.interests.map(interest => (
                  <VStack alignItems={"flex-start"} mb={8}>
                    <Text key={interest.id}>
                      <b>Name:</b> {interest.name}
                    </Text>
                    <Text key={interest.id}>
                      <b>Number:</b> {interest.number}
                    </Text>
                    <Text key={interest.id}>
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
