import { z } from 'zod'

export const purchasingDemandProductsInsert = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  purchasing_demand_id: z.number().optional().nullable(),
  products_id: z.string().uuid(),
  price: z.number(),
  quantity: z.number(),
  updated_at: z.string().optional(),
})
