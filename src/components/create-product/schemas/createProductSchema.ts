import { z } from 'zod';


export const cardsSchema = z.object({
  name: z.string()
    .min(5, "название слишком которкое")
    .max(20, "название слишком длинное"),
  email: z.string()
    .min(7, 'email слишком которкий')
    .max(40, "email слишком длинный"),
  body: z.string()
    .min(10, "описание слишком короткое")
    .max(200, "описание слишком длинное"),
})
export type UserFormData = z.infer<typeof cardsSchema>;

