import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@rsces/components/DataTable";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";
import ModalForm from "@rsces/components/Modal/modalForm";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";
import { useFileFromUrl } from "@rsces/service/service-file";
import {
  IOrganizations,
  useCreateOrganization,
  useDeleteOrganization,
  useGetAllOrganizations,
} from "@rsces/service/service-organizations";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { toFormData } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { generatePath, useNavigate } from "react-router-dom";
import * as yup from "yup";
import SearchBar from "../Layout/SearchBar";

const defaultValues = {
  name: "",
  image: null as unknown as File,
  description: "",
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Price is required"),
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
  const { mutate: createOrganization, isPending } = useCreateOrganization();
  console.log(orgData, "orgData");

  const [searchFilterData, setSearchFilterData] = useState("");
  const columnFilters: ColumnFiltersState = [];
  const [deleteId, setDeleteId] = useState<number | null>(null);
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }

  const { mutate: deleteProduct } = useDeleteOrganization();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const columnHelper = createColumnHelper<IOrganizations>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const { data: imageFile } = useFileFromUrl(imageUrl);

  useEffect(() => {
    if (!imageFile) return;
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
    createOrganization(formdata, {
      onSuccess: () => {
        onAddClose();
        reset(defaultValues);
      },
    });
  };
  const orgColumn = useMemo(
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
                navigate(
                  generatePath(NAVIGATION_ROUTES.ORGANIZATION_PROFILE, {
                    id: String(row.original.id),
                  }),
                );
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
        columns={orgColumn}
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
        title={"Add Organization"}
        size={{ base: "full", md: "lg" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isPending}
      >
        <>
          <InputField
            control={control}
            name="name"
            label="Name"
            placeholder="Enter Organization name"
            errors={errors}
          />
          <Textarea
            control={control}
            name="description"
            label="Description"
            placeholder="Enter Organization Description"
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
    </>
  );
};

export default AdminOrganizations;
