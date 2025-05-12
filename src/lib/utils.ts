import { z } from "zod";

export const signUpSchema = z.object({
  fName: z.string().min(3, "first name must be 3 characters or more"),
  lName: z.string().min(3, "last name must be 3 characters or more"),
  phoneNumber: z.string(),
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password must be 6 characters or more"),
  confirmPassword: z.string().min(6, "password must be 6 characters or more"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Show the error under confirmPassword field
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password must be 6 characters or more"),

});
