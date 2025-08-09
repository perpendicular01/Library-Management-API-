import * as z from "zod";

export const borrowZod = z.object({
  book: z.string({ error: "id is must" }),
  quantity: z.number().int().positive({ message: "Copies must be a positive integer" }),
  dueDate: z.coerce.date()
});
