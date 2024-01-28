import * as Yup from "yup";

export let addUserSchema = Yup.object({
  firstName: Yup.string().required("First name is required.").trim().max(55),
  lastName: Yup.string().required("Last name is required.").trim().max(55),
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .max(55)
    .lowercase(),
  password: Yup.string()
    .required("Password must be required")
    .max(20, "Password must be at max 20 character")
    .min(6, "Password must be at min 6 character")
    .trim(),
  dob: Yup.date().nullable(),
  gender: Yup.string().nullable().oneOf(["male", "female", "other"]),
});
