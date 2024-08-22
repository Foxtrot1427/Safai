import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.mixed<FileList>(),
  itemName: yup.string().required("Item name is required"),
  pickUpTime: yup.string(),
  pickUpDate: yup.string(),
  phoneNumber: yup.string().required("Phone number is required"),
  description: yup.string(),
}).test('pickUpDate-and-time', 'Both pick up date and time are required when either is provided', function (values) {
  const { pickUpDate, pickUpTime } = values;
  if ((pickUpDate && !pickUpTime)) {
    return this.createError({
      path: 'pickUpTime',
      message: 'Pick up time is required when Date is provided',
    });
  }
  else if ((!pickUpDate && pickUpTime)) {
    return this.createError({
      path: 'pickUpDate',
      message: 'Pick up date is required when Time is provided',
    });
  }
  return true;
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
