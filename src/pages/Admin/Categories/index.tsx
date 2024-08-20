import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
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
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@rsces/components/DataTable";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";
import ModalForm from "@rsces/components/Modal/modalForm";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import {
  ICategories,
  SubCategory,
  useCreateCategory,
  useCreateSubCategory,
  useDeleteCategory,
  useDeleteSubCategory,
  useGetCategories,
  useUpdateCategory,
} from "@rsces/service/service-categories";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { GrView } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import SearchBar from "../Layout/SearchBar";

const defaultValues = {
  name: "",
  description: "",
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const AdminCategories = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { data: categoriesData, isLoading } = useGetCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: updateCategory, isPending: isEditingCategories } =
    useUpdateCategory();
  const { mutate: createSubCategory, isPending: isSubCatPending } =
    useCreateSubCategory();
  const { mutate: deleteSubCategory } = useDeleteSubCategory();
  const [searchFilterData, setSearchFilterData] = useState("");
  const columnFilters: ColumnFiltersState = [];
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [rowId, setRowId] = useState<number | null>(null);
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSub,
    onOpen: onOpenSub,
    onClose: onCloseSub,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isSubCategoryOpen,
    onOpen: onSubCategoryOpen,
    onClose: onSubCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const columnHelper = createColumnHelper<ICategories>();

  const onDelete = () => {
    if (deleteId) {
      deleteCategory(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          onClose();
        },
      });
    }
  };
  const onDeleteSubCategory = () => {
    if (deleteId) {
      deleteSubCategory(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          onCloseSub();
        },
      });
    }
  };
  //   Create Categores on modal button submit
  const onSubmit = (data: typeof defaultValues) => {
    createCategory(data, {
      onSuccess: () => {
        onAddClose();
        reset(defaultValues);
      },
    });
  };
  const onSubmitEdit = (data: typeof defaultValues) => {
    if (rowId) {
      updateCategory(
        { id: rowId, data: data },
        {
          onSuccess: () => {
            onEditClose();
            reset(defaultValues);
            setRowId(null);
          },
        },
      );
    }
  };
  const submitSubCategory = (data: typeof defaultValues) => {
    if (rowId) {
      createSubCategory(
        { id: rowId, data: data },
        {
          onSuccess: () => {
            onSubCategoryClose();
            reset(defaultValues);
            onDrawerClose();
          },
        },
      );
    }
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
      columnHelper.accessor("subCategories", {
        header: "Sub-Categories",
        cell: ({ row }) => (
          <HStack spacing={0}>
            <IconButton
              p={0}
              variant={"ghost"}
              aria-label="View Category"
              icon={<GrView />}
              onClick={() => {
                onDrawerOpen();
                setSubCategory(row?.original?.subCategories);
                setRowId(row.original.id);
              }}
            />
          </HStack>
        ),
      }),
      columnHelper.accessor("id", {
        header: "Actions",
        cell: ({ row }) => (
          <HStack spacing={0}>
            <IconButton
              p={0}
              variant={"ghost"}
              aria-label="Edit Categories"
              icon={<EditIcon />}
              onClick={() => {
                setRowId(row.original.id);
                reset({
                  name: row.original.name,
                  description: row.original.description,
                });
                onEditOpen();
              }}
            />
            <IconButton
              variant={"ghost"}
              aria-label="Delete Donation"
              colorScheme="red"
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
    [columnHelper, onOpen, onDrawerOpen, onEditOpen, reset],
  );
  const formFields = (
    <>
      <InputField
        control={control}
        name="name"
        label="Name"
        placeholder="Enter Category name"
        errors={errors}
      />
      <Textarea
        control={control}
        name="description"
        label="Description"
        placeholder="Enter Category Description"
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
          Add Category
        </Button>
      </Flex>
      <DataTable
        columns={orgColumn}
        data={categoriesData ?? []}
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
        title={"Add Category"}
        size={{ base: "full", md: "lg" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isPending}
      >
        {formFields}
      </ModalForm>
      <ModalForm
        isOpen={isSubCategoryOpen}
        onClose={() => {
          onSubCategoryClose();
          reset(defaultValues);
        }}
        title={"Add Sub-Category"}
        size={{ base: "full", md: "lg" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(submitSubCategory)}
        isSubmitting={isSubCatPending}
      >
        <>
          <InputField
            control={control}
            name="name"
            label="Name"
            placeholder="Enter Sub-Category name"
            errors={errors}
          />
          <Textarea
            control={control}
            name="description"
            label="Description"
            placeholder="Enter Sub-Category Description"
          />
        </>{" "}
      </ModalForm>
      <ModalForm
        isOpen={isEditOpen}
        onClose={() => {
          onEditClose();
          reset(defaultValues);
          setRowId(null);
        }}
        title={"Edit Category"}
        size={{ base: "full", md: "3xl" }}
        buttonLabel={"Update"}
        onSubmit={handleSubmit(onSubmitEdit)}
        isSubmitting={isEditingCategories}
      >
        {formFields}
      </ModalForm>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => {
          onClose();
          setSubCategory([]);
        }}
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
          <DrawerHeader fontSize={24}>Sub-Category</DrawerHeader>
          <DrawerBody>
            <HStack justify={"flex-end"}>
              <Button
                colorScheme="facebook"
                variant="primaryInverted"
                leftIcon={<IoMdAdd />}
                onClick={onSubCategoryOpen}
              >
                Add Sub-Category
              </Button>
            </HStack>
            <VStack align="stretch" spacing={4} mt={4}>
              {subCategory && subCategory.length !== 0 ? (
                subCategory.map((item, index) => (
                  <Box
                    key={index}
                    p={4}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <HStack justify="space-between" align="center">
                      <Text fontSize="lg" fontWeight="bold" color="teal.600">
                        {item.name}
                      </Text>
                      <IconButton
                        variant={"ghost"}
                        size="sm"
                        colorScheme="red"
                        aria-label="Delete Donation"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          onOpenSub();
                        }}
                      />
                    </HStack>
                    <Text mt={2} fontSize="sm" color="gray.600">
                      {item.description}
                    </Text>
                    {index < subCategory.length - 1 && <Divider mt={4} />}
                  </Box>
                ))
              ) : (
                <Text fontSize="lg" color="gray.500" textAlign="center">
                  No Sub-Category Found
                </Text>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ConfirmationModel
        isOpen={isOpenSub}
        onClose={onCloseSub}
        handleSubmit={onDeleteSubCategory}
      />
    </>
  );
};

export default AdminCategories;
