import { EditIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@rsces/components/DataTable";
import ModalForm from "@rsces/components/Modal/modalForm";
import InputField from "@rsces/components/form/InputField";
import Textarea from "@rsces/components/form/Textarea";
import {
  Dashboard,
  useStats,
  useUpdateStats,
} from "@rsces/service/service-stats";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SearchBar from "../Layout/SearchBar";
import { getYearsSince } from "@rsces/hooks/getYearsSince";

const defaultValues = {
  title: "",
  quantity: 0,
  unit: "",
};
export type IStatsForm = typeof defaultValues;

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  quantity: yup.number().required("Quantity is required"),
  unit: yup.string().required("Unit is required"),
});
const AdminStats = () => {
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
  const { data: statsData, isLoading } = useStats();
  const { mutate: updateStats, isPending } = useUpdateStats();
  const [rowId, setRowId] = useState<number | null>(null);
  const yearsSince = getYearsSince("2014-01-26");

  const [searchFilterData, setSearchFilterData] = useState("");
  const columnFilters: ColumnFiltersState = [];
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<Dashboard>();

  const onSubmit = (data: typeof defaultValues) => {
    rowId &&
      updateStats(
        {
          id: rowId,
          data: data,
        },
        {
          onSuccess: () => {
            onClose();
            reset(defaultValues);
            setRowId(null);
          },
        },
      );
  };
  const orgColumn = useMemo(
    () => [
      columnHelper.display({
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor("title", {
        header: "Title",
      }),
      columnHelper.accessor("quantity", {
        header: "Quantity",
        cell: ({ row }) => (
          <HStack spacing={0}>
            {row.index === 0 ? <>{yearsSince}</> : <>{row.original.quantity}</>}
          </HStack>
        ),
      }),
      columnHelper.accessor("unit", {
        header: "Unit",
      }),

      columnHelper.accessor("id", {
        header: "Actions",
        cell: ({ row }) => (
          <HStack spacing={0}>
            {row.index === 0 ? null : (
              <IconButton
                p={0}
                variant={"ghost"}
                aria-label="Edit Donation"
                icon={<EditIcon />}
                onClick={() => {
                  setRowId(row.original.id);
                  reset({
                    title: row.original.title,
                    quantity: row.original.quantity,
                    unit: row.original.unit,
                  });
                  onOpen();
                }}
              />
            )}
          </HStack>
        ),
      }),
    ],
    [columnHelper, onOpen, reset, yearsSince],
  );

  return (
    <>
      <Flex justify={"space-between"} align={"center"} my={8}>
        <SearchBar getFilterData={searchFilterDataProp} />
      </Flex>
      <DataTable
        columns={orgColumn}
        data={statsData ? statsData.dashboard : []}
        filter={{
          globalFilter: searchFilterData,
          columnFilters: columnFilters,
        }}
        isLoading={isLoading}
      />
      <ModalForm
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset(defaultValues);
        }}
        title={"Edit Statistics"}
        size={{ base: "full", md: "lg" }}
        buttonLabel={"Update"}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isPending}
      >
        <>
          <InputField
            control={control}
            name="title"
            label="Title"
            placeholder="Enter Title"
            errors={errors}
          />
          <Textarea
            control={control}
            name="quantity"
            label="Quantity"
            placeholder="Enter Quantity"
          />
          <InputField
            control={control}
            name="unit"
            label="Unit"
            placeholder="Enter Unit"
            errors={errors}
          />
        </>
      </ModalForm>
    </>
  );
};

export default AdminStats;
