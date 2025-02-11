import { z } from 'zod'

export const productUnitRowSchema = z.object({
  id: uuidSchema,
  unit_id: numberRequiredSchema,
  created_at: createdAtSchema.optional(),
  name: nameSchema,
  name_bec: nameSchema,
})

export const productUnitRowsSchema = z.array(productUnitRowSchema)
