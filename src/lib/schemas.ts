import { z } from "zod";

export const Step1Schema = z.object({
  title: z.string().min(3, "Title must be at least 3 chars"),
  author: z.string().min(2, "Author required"),
});

export const Step2Schema = z.object({
  summary: z.string().min(10, "Summary must be at least 10 chars"),
  category: z.enum(["Tech", "Lifestyle", "Business"]),
});

export const Step3Schema = z.object({
  content: z.string().min(20, "Content is too short"),
});

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  summary: z.string(),
  category: z.enum(["Tech", "Lifestyle", "Business"]),
  content: z.string(),
  createdAt: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
