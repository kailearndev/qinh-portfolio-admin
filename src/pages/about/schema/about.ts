import { z } from "zod";

export const abooutSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  experience: z.number().min(0, "Experience must be a non-negative number"),
  client_worked: z
    .number()
    .min(0, "Clients worked must be a non-negative number"),
  cv_upload: z.string().url("CV Upload must be a valid URL"),
});

export type AboutFormValues = z.infer<typeof abooutSchema>;
