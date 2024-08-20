import * as yup from "yup";

export const defaultValues = {
  name: "",
  number: "",
  description: "",
};

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  number: yup.string().required("Phone number is required"),
  description: yup
    .string()
    .required()
    .max(255, "Maximum 255 characters allowed"),
});
