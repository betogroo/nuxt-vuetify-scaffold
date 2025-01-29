import { z } from 'zod'

export const productOnDemandRow = z.object({
  id: uuidSchema,
  created_at: databaseDateSchema,
  name: nameSchema,
  product_class: z.number(),
  cat_mat: z.number(),
  bec_number: z.number(),
  quantity: z.number(),
  price: z.number(),
  total_price: z.number(),
})

export const productOnDemandRows = z.array(productOnDemandRow)
