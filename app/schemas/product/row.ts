import { z } from 'zod'

// Schema para validar uma linha completa (row)
export const productRowSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime({ offset: true }), // Timestamp com fuso horário
  cat_mat: z.number(),
  bec_number: z.number(),
  name: z.string(),
  pdm_number: z.number().nullable(), // Pode ser nulo
  product_class_id: z.number(),
  expense_category_id: z.number(),
})

export const productRowsSchema = z.array(productRowSchema)
