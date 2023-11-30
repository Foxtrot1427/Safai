import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  image: yup.mixed<FileList>().required('Image is required'),
  itemName: yup.string().required('Item name is required'),
  pickUpDate: yup.string().required('Pick up date is required'),
  pickUpTime: yup.string().required('Pick up time is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  description: yup.string().required('Description is required'),
});

export const defaultValues = {
  name: '',
  image: null as unknown as FileList,
  itemName: '',
  pickUpDate: '',
  pickUpTime: '',
  phoneNumber: '',
  description: '',
};
