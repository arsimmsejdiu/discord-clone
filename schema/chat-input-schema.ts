import * as z from "zod";

export const chatInputFormSchema = z.object({
    content: z.string().min(1)
})