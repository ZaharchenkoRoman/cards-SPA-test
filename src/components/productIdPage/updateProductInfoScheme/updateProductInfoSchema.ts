import {z} from "zod";

export const schema = z.object({
  name: z.string()
    .min(3, "Минимум 3 символа")
    .max(50 ,"Максимум 50 символов"),
  email: z.string()
    .email("неправильный Email")
    .min(4,  "минимум 4 символа")
    .max(50 ,{message: "Максимум 50 символов"}),
  body: z.string()
    .min(4, {message: "минимум 4 символа"})
    .max(50 ,{message: "Максимум 50 символов"})
})
export type schemaType = z.infer<typeof schema>;