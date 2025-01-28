import { z } from 'zod'

export const productUpdateSchema = z
  .object({
    cat_mat: z.bigint().optional(),
    bec_number: z.bigint().optional(),
    name: z.string().optional(),
    pdm_number: z.bigint().nullable().optional(),
    product_class_id: z.bigint().optional(),
    expense_category_id: z.bigint().optional(),
  })
  .strict()
