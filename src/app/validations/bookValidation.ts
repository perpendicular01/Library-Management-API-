import * as z from "zod";

export const bookZod = z.object({
    title: z.string({ error: "Title is must" }),
    author: z.string({ error: "Author is must" }),
    genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], { error: "Genre is must" }),
    isbn: z.string({ error: "ISBN is must and unique" }),
    description: z.string({}).optional(),
    copies: z.number().int().nonnegative({ error: "Copies must be a non-negative integer" }),
    available: z.boolean().default(true)
});

