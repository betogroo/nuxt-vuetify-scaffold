import { z } from 'zod'

export const productUnitInsertSchema = z.object({
  product_id: uuidSchema,
  unit_id: numberRequiredSchema,
})
