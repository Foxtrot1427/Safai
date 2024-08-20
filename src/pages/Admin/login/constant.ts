import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const defaultValues = {
  email: "",
  password: "",
};
