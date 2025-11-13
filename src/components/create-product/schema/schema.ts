import { z } from 'zod';


export const cardsSchema = z.object({
  name: z.string()
    .min(5, "название слишком которкое")
    .max(20),
  email: z.string()
    .min(7, 'email слишком которкий')
    .max(20),
  body: z.string()
    .min(10)
    .max(200),
})
export type UserFormData = z.infer<typeof cardsSchema>;