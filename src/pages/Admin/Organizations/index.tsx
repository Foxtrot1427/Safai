import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@rsces/components/DataTable";
import Modal from "@rsces/components/Modal";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";
import ModalForm from "@rsces/components/Modal/modalForm";
import InputField from "@rsces/components/form/InputField";
import { useFileFromUrl } from "@rsces/service/service-file";
import {
  IOrganization,
  OrganizationDonation,
  useGetAllOrganizations,
} from "@rsces/service/service-organizations";
import {
  useCreateProduct,
  useDeleteProduct,
} from "@rsces/service/service-products";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { toFormData } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import SearchBar from "../Layout/SearchBar";

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
const AdminOrganizations = () => {
  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { data: orgData, isLoading } = useGetAllOrganizations();
  console.log(orgData, "orgData");

  const [searchFilterData, setSearchFilterData] = useState("");
  const columnFilters: ColumnFiltersState = [];
  const [deleteId, setDeleteId] = useState<number | null>(null);
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }

  const { mutate: deleteProduct } = useDeleteProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOrgOpen,
    onOpen: onOrgOpen,
    onClose: onOrgClose,
  } = useDisclosure();

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const columnHelper = createColumnHelper<IOrganization>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [rowId, setRowId] = useState<number | null>(null);
  const { mutate: createProduct } = useCreateProduct();

  const [imageUrl, setImageUrl] = useState("");
  const { data: imageFile } = useFileFromUrl(imageUrl);
  console.log(orgData?.filter(org => +org.id === rowId), "filter");

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
      columnHelper.accessor("description", {
        header: "Description",
      }),
      columnHelper.accessor("image", {
        header: "Image",
        cell: ({ row }) => (
          <Image src={row.original.image} alt={row.original.name} h={8} />
        ),
      }),
      columnHelper.accessor("id", {
        header: "Actions",
        cell: ({ row }) => (
          <HStack spacing={0}>
            <IconButton
              p={0}
              variant={"ghost"}
              aria-label="View Interests"
              icon={<GrView />}
              onClick={() => {
                setRowId(+row.original.id);
                onOrgOpen();
              }}
            />
            <IconButton
              p={0}
              variant={"ghost"}
              aria-label="Edit Donation"
              icon={<EditIcon />}
              onClick={() => {
                setImageUrl(row.original.image);
                // reset({
                //   name: row.original.name,
                //   price: row.original.price,
                // });
                // onAddOpen();
              }}
            />
            <IconButton
              variant={"ghost"}
              aria-label="Delete Donation"
              icon={<DeleteIcon />}
              onClick={() => {
                setDeleteId(+row.original.id);
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
          Add Organization
        </Button>
      </Flex>
      <DataTable
        columns={productsColumns}
        data={orgData ?? []}
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
      <Modal
        isOpen={isOrgOpen}
        onClose={onOrgClose}
        header={"Organization Details"}
        size={"9xl"}
      >
        {orgData
          ?.filter(org => +org.id === rowId)
          .map((org: IOrganization) => (
            <>
              <VStack spacing={4} width={"full"}>
                <Image src={org.image} alt={org.name} h={80} />
                <Text width={"full"}>
                  <Heading size="md">Organization Name:</Heading> {org.name}
                </Text>
                <Text width={"full"}>
                  <Heading size="md">Organization Description:</Heading>
                  {org.description}
                </Text>
                <HStack>
                  {org.organizationDonation.map(
                    (donation: OrganizationDonation) => (
                      <VStack
                        key={donation.id}
                        w={"full"}
                        p={4}
                        bg={"gray.100"}
                      >
                        <Text>Donation: {donation.donation}</Text>
                        <Text>Categories: {donation.categories.name}</Text>
                      </VStack>
                    ),
                  )}
                </HStack>
              </VStack>
            </>
          ))}
      </Modal>
    </>
  );
};

export default AdminOrganizations;
