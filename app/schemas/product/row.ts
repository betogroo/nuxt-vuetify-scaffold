import { z } from 'zod'

// Schema para validar uma linha completa (row)
export const productRowSchema = z.object({
  id: z.string().uuid(),
  created_at: createdAtSchema,
  cat_mat: z.number(),
  bec_number: z.number(),
  name: nameSchema,
  pdm_number: z.number().nullable(), // Pode ser nulo
  product_class_id: z.number(),
  expense_category_id: z.number(),
})

export const productRowsSchema = z.array(productRowSchema)

export const productNameSearch = productRowSchema.pick({
  name: true,
})
