import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@rsces/components/DataTable";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";
import ModalForm from "@rsces/components/Modal/modalForm";
import Dropzone, { FileWithPreview } from "@rsces/components/form/Dropzone";
import FormControl from "@rsces/components/form/FormControl";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import { NAVIGATION_ROUTES } from "@rsces/routes/routes.constant";
import { useGetCategories } from "@rsces/service/service-categories";
import { useFileFromUrl } from "@rsces/service/service-file";
import {
  OrganizationDonation,
  useDeleteDonation,
  useDeleteOrganization,
  useGetOneOrganization,
  useSubmitDonation,
  useUpdateOrganization,
} from "@rsces/service/service-organizations";
import { colors } from "@rsces/theme/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { toFormData } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
const defaultValues = {
  name: "",
  image: null as unknown as FileWithPreview[],
  description: "",
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: yup.mixed<FileWithPreview[]>().required("Image is required"),
});
type SubCategory = {
  id: number;
  name: string;
};
const OrganizationProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { mutate: deleteOrg } = useDeleteOrganization();

  const [imageUrl, setImageUrl] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [orgDeleteId, setOrgDeleteId] = useState("");
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  const {
    data: imageFile,
    isLoading: isImageFileLoading,
    isFetching: isImageFileFetching,
  } = useFileFromUrl(imageUrl);

  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate: editOrganization, isPending } = useUpdateOrganization();
  const { mutate: submitDonation, isPending: isDonationSubmitting } =
    useSubmitDonation();
  const { data: organization, isLoading } = useGetOneOrganization(id ?? "");
  const { mutate: deleteDonation } = useDeleteDonation();
  const { data: categories } = useGetCategories();
  const columnHelper = createColumnHelper<OrganizationDonation>();
  const donationColumn = useMemo(
    () => [
      columnHelper.display({
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor("categories.name", {
        header: "Category",
      }),
      columnHelper.accessor(row => row.categories?.subCategories[0]?.name, {
        header: "Sub Category",
      }),
      columnHelper.accessor("donation", {
        header: "Quantity",
      }),
      columnHelper.accessor("unit", {
        header: "Unit",
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: ({ row }) => new Date(row.original.date).toDateString(),
      }),
      columnHelper.accessor("id", {
        header: "Action",
        cell: ({ row }) => (
          <>
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
          </>
        ),
      }),
    ],
    [columnHelper, onOpen],
  );
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDonationsOpen,
    onOpen: onDonationsOpen,
    onClose: onDonationsClose,
  } = useDisclosure();
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
  const donationsDefaultValues = {
    donation: "",
    category: { label: "", value: "" },
    subCategory: { label: "", value: "" },
    date: "",
    organizations: id,
    unit: { label: "", value: "" },
  };

  const {
    control: donationsControl,
    formState: { errors: donationsErrors },
    handleSubmit: donationsHandleSubmit,
    watch: donationsWatch,
    reset: res,
  } = useForm({
    mode: "onChange",
    defaultValues: donationsDefaultValues,
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!imageFile) return;

    const file = Object.assign(imageFile, {
      preview: URL.createObjectURL(imageFile),
    });

    setValue("image", [file]);
  }, [imageFile, setValue]);
  const onSubmit = (data: typeof defaultValues) => {
    const formdata = toFormData(data, undefined, {
      indexes: null,
    });
    id &&
      editOrganization(
        { id: +id, data: formdata },
        {
          onSuccess: () => {
            onEditClose();
            reset(defaultValues);
          },
        },
      );
  };

  const onDeleteOrg = () => {
    if (orgDeleteId) {
      // Delete org
      deleteOrg(+orgDeleteId, {
        onSuccess: () => {
          setDeleteId("");
          onClose();
          navigate(NAVIGATION_ROUTES.ADMIN_ORGANIZATIONS);
        },
      });
    }
  };
  const onDelete = () => {
    deleteId &&
      deleteDonation(+deleteId, {
        onSuccess: () => {
          onClose();
        },
      });
  };
  function donationsSubmit(data: typeof donationsDefaultValues) {
    if (!id) return;
    const formattedData = {
      donation: +data.donation,
      categories: +data.category.value,
      organizations: +id,
      unit: data.unit.value,
    };
    submitDonation(formattedData, {
      onSuccess: () => {
        onDonationsClose();
        res(donationsDefaultValues);
      },
    });
  }
  const donaWatch = donationsWatch()?.category;
  useEffect(() => {
    if (!donationsWatch().category) return;
    const subCategories = categories?.find(
      category => category.id.toString() === donationsWatch().category.value,
    )?.subCategories;
    setSubCategory(subCategories ?? []);
  }, [categories, donaWatch, donationsWatch]);

  return isLoading ? (
    <Flex justifyContent="center" alignItems="center" height="80vh">
      <Spinner />
    </Flex>
  ) : (
    <>
      <Box>
        <Box
          width="100%"
          position="relative"
          bgColor={"blue.600"}
          className="banner"
        >
          <Box bgColor={"#5B90E4"} h={48} width={"100%"} />
          <Flex
            position={"absolute"}
            top="100%"
            left="44px"
            transform={`translateY(-50%)`}
          >
            <Box position="relative">
              <Avatar
                border={`6px solid ${colors.white} `}
                size={"2xl"}
                name={"name"}
                src={organization?.image}
              />
            </Box>
            <Box>
              <Box ml="20px" mt="10px">
                <Text color={colors.white} fontWeight={600}>
                  {organization?.name}
                </Text>
                <Text fontSize="14px" color={colors.white}></Text>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Flex>
          <Box
            mt="100px"
            ml="35px"
            textAlign="center"
            className="info"
            maxW={"40%"}
          >
            <Text letterSpacing="0.25px" fontWeight="500" fontSize="30px">
              {organization?.name}
            </Text>
            <Text letterSpacing="0.25px" fontWeight="500" fontSize="30px">
              Total Quantity: {organization?.total}
            </Text>
            <Text
              mt="8px"
              fontWeight="400"
              fontSize="14px"
              color={colors.gray_700}
              letterSpacing="0.25px"
            >
              Description: {organization?.description}
            </Text>
            <Text
              mt="8px"
              fontWeight="400"
              fontSize="14px"
              color={colors.gray_700}
              letterSpacing="0.25px"
            >
              Overall Contribution: {organization?.contribution.toFixed(2)}%
            </Text>
            <HStack>
              <Button
                onClick={() => {
                  reset({
                    name: organization?.name,
                    description: organization?.description,
                  });
                  onEditOpen();
                  setImageUrl(organization?.image ?? "");
                }}
                width=" 119.667px"
                height="41px"
                variant={"edit"}
                gap="8px"
                mt="20px"
              >
                <BsPencilSquare />
                Edit
              </Button>
              <Button
                onClick={() => {
                  onDonationsOpen();
                }}
                height="41px"
                variant={"edit2"}
                gap="8px"
                mt="20px"
              >
                <BsPencilSquare />
                Donations
              </Button>
              <Button
                onClick={() => {
                  setOrgDeleteId(id ?? "");
                  onDeleteOpen();
                }}
                variant={"delete"}
                width=" 119.667px"
                height="41px"
                gap="8px"
                mt="20px"
              >
                <DeleteIcon />
                Delete
              </Button>
            </HStack>
          </Box>
          <Box
            mt="50px"
            ml="20px"
            width="1380px"
            borderRadius="12px"
            p="40px"
            border={`2px solid ${colors.gray_100}`}
          >
            <DataTable
              data={organization?.organizationDonation ?? []}
              columns={donationColumn}
            />
          </Box>
        </Flex>
      </Box>
      <ModalForm
        isOpen={isEditOpen}
        onClose={() => {
          onEditClose();
          reset(defaultValues);
          setImageUrl("");
        }}
        title={"Edit Organization Details"}
        size={{ base: "full", md: "2xl" }}
        buttonLabel={"Add"}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isPending}
      >
        <Flex gap={3}>
          <Box flex={1}>
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
          </Box>
          <Flex flex={1}>
            <Dropzone
              control={control}
              name="image"
              isLoading={isImageFileLoading || isImageFileFetching}
            />
          </Flex>
        </Flex>
      </ModalForm>
      <ModalForm
        isOpen={isDonationsOpen}
        onClose={onDonationsClose}
        title={"Donations"}
        size={{ base: "full", md: "xl" }}
        buttonLabel={"Submit"}
        onSubmit={donationsHandleSubmit(donationsSubmit)}
        isSubmitting={isDonationSubmitting}
      >
        <VStack height={68}>
          <FormControl
            inputControl="select"
            control={donationsControl}
            name="category"
            label="Category"
            placeholder="Select Category"
            options={
              categories?.map(category => ({
                label: category.name,
                value: category.id.toString(),
              })) ?? []
            }
          />
          <FormControl
            inputControl="select"
            control={donationsControl}
            name="subCategory"
            label="Sub Category"
            placeholder="Select Sub Category"
            options={
              subCategory.map((subCategory: SubCategory) => ({
                label: subCategory.name,
                value: subCategory.id.toString(),
              })) ?? []
            }
          />

          <InputField
            control={donationsControl}
            name="donation"
            label="Quantity"
            placeholder="Enter Quantity"
            errors={donationsErrors}
          />
          <FormControl
            inputControl="select"
            control={donationsControl}
            name="unit"
            label="Unit"
            placeholder="Enter Unit"
            options={[
              { label: "Kg", value: "kg" },
              { label: "Litre", value: "litre" },
              { label: "Piece", value: "piece" },
            ]}
          />
          <InputField
            control={donationsControl}
            type="date"
            name="date"
            label="Date"
            placeholder="Enter Date"
            errors={donationsErrors}
          />
        </VStack>
      </ModalForm>
      <ConfirmationModel
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onDelete}
      />
      {/* Delete Confirmation Modal */}
      <ConfirmationModel
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        handleSubmit={onDeleteOrg}
      />
    </>
  );
};

export default OrganizationProfile;
