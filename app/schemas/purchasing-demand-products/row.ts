import { z } from 'zod'

export const purchasingDemandProductsRow = z.object({
  id: z.string(),
  created_at: z.string(),
  purchasing_demand_id: z.number().nullable(),
  products_id: z.string().uuid(),
  price: z.number().nullable(),
  quantity: z.number().nullable(),
  updated_at: z.string().nullable(),
})

export const purchasingDemandProductsRows = z.array(purchasingDemandProductsRow)
