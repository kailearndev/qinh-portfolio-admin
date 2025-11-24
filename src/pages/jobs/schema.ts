import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  duration: z.string().min(10, "Duration must be at least 10 characters"),
  position: z.string().min(5, "Position must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  is_public: z.boolean().default(true),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
