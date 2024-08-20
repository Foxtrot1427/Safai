import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.mixed<FileList>(),
  itemName: yup.string().required("Item name is required"),
  pickUpDate: yup.string(),
  pickUpTime: yup.string(),
  phoneNumber: yup.string().required("Phone number is required"),
  description: yup.string().required("Description is required"),
});

export type DonationFormValues = yup.InferType<typeof schema>;

export const defaultValues = {
  name: "",
  image: undefined as unknown as FileList | undefined,
  itemName: "",
  pickUpDate: "",
  pickUpTime: "",
  phoneNumber: "",
  description: "",
};
