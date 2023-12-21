import * as z from "zod";

export const chatInputFormSchema = z.object({
  content: z.string().min(1),
});

export const chatItemSchema = z.object({
  content: z.string().min(1),
});
