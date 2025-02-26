import { z } from 'zod'

export const productUnitRowSchema = z.object({
  id: uuidSchema,
  unit_id: numberRequiredSchema,
  created_at: createdAtSchema.optional(),
  name: nameSchema,
  name_bec: nameSchema,
})

export const unitRowSchema = productUnitRowSchema.omit({
  id: true,
  created_at: true,
})

export const productUnitRowsSchema = z.array(productUnitRowSchema)
export const unitRowsSchema = z.array(unitRowSchema)
