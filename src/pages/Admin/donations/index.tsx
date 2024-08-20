import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "@rsces/components/DataTable";
import {
  useDonations,
  useUpdateDonation,
} from "@rsces/service/service-donation";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import SearchBar from "../Layout/SearchBar";
import { donationColumns } from "./column";
import ConfirmationModel from "@rsces/components/Modal/conformationModal";

const AdminDonations = () => {
  const { mutate: acceptDonation } = useUpdateDonation();
  const [searchFilterData, setSearchFilterData] = useState("");
  const [confirmationId, setConfirmationId] = useState<number | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const columnFilters: ColumnFiltersState = [];
  function searchFilterDataProp(childData: string) {
    setSearchFilterData(childData);
  }
  const { data: donationData, isLoading } = useDonations();
  const pendingDonations = donationData?.filter(
    donation => donation.isAccepted === false,
  );
  const completedDonations = donationData?.filter(
    donation => donation.isAccepted === true,
  );
  function onSubmit() {
    const data = { isAccepted: "true" };
    confirmationId && acceptDonation({ data, id: confirmationId });
  }

  return (
    <>
      <Flex justify={"space-between"} align={"center"} my={8}>
        <SearchBar getFilterData={searchFilterDataProp} />
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Pending</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DataTable
              columns={donationColumns({ setConfirmationId, onOpen })}
              data={pendingDonations ?? []}
              filter={{
                globalFilter: searchFilterData,
                columnFilters: columnFilters,
              }}
              isLoading={isLoading}
            />{" "}
          </TabPanel>
          <TabPanel>
            <DataTable
              columns={donationColumns({ setConfirmationId, onOpen })}
              data={completedDonations ?? []}
              filter={{
                globalFilter: searchFilterData,
                columnFilters: columnFilters,
              }}
              isLoading={isLoading}
              rowSize={40}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ConfirmationModel
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onSubmit}
        confirmationMessage="Are you sure you want to complete this Order?"
        deleteLabel="Complete"
      />
    </>
  );
};

export default AdminDonations;
