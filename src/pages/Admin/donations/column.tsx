import { HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { CheckmarkIcon } from "react-hot-toast";
import { IDonation } from "./interface";

const columnHelper = createColumnHelper<IDonation>();

export const donationColumns = ({
  setConfirmationId,
  onOpen,
}: {
  setConfirmationId: (id: number) => void;
  onOpen: () => void;
}) => [
  columnHelper.display({
    header: "S.N.",
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("number", {
    header: "Number",
  }),
  columnHelper.accessor("itemName", {
    header: "Item Name",
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: ({ row }) => (
      <Image src={row.original.image} alt={row.original.itemName} h={20} />
    ),
  }),
  columnHelper.accessor("pickUpDate", {
    header: "Pick Up Date",
    cell: ({ row }) => new Date(row.original.pickUpDate).toDateString(),
  }),
  columnHelper.accessor("pickUpTime", {
    header: "Pick Up Time",
    cell: ({ row }) =>
      new Date(row.original.pickUpTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.display({
    header: "Mark as Completed",
    cell: ({ row }) => (
      <HStack spacing={0} justify={"center"}>
        {row.original.isAccepted ? (
          <Text fontSize={16} fontWeight={400} color={"green.600"}>
            Completed
          </Text>
        ) : (
          <IconButton
            p={0}
            variant={"ghost"}
            aria-label="Edit Donation"
            icon={<CheckmarkIcon />}
            onClick={() => {
              setConfirmationId(row.original.id);
              onOpen();
            }}
          />
        )}
      </HStack>
    ),
  }),
];
