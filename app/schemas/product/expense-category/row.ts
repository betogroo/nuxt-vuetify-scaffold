import { z } from 'zod'

export const productExpenseCategoryRowSchema = z.object({
  id: z.number().positive(),
  created_at: createdAtSchema,
  name: nameSchema,
})

export const productExpenseCategoryRowsSchema = z.array(
  productExpenseCategoryRowSchema,
)
