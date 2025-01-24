import { z } from 'zod'

export const productInsertSchema = z.object({
  cat_mat: z.bigint(),
  bec_number: z.bigint(),
  name: z.string(),
  pdm_number: z.bigint().nullable().optional(), // Pode ser omitido ou nulo
  product_class_id: z.bigint(),
  expense_category_id: z.bigint(),
})
