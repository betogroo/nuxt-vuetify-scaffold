import { z } from 'zod'

export const packagingUnitRowSchema = z.object({
  id: numberRequiredSchema,
  created_at: createdAtSchema.optional(),
  name: nameSchema,
  name_bec: nameSchema,
})

export const packagingUnitRowsSchema = z.array(packagingUnitRowSchema)
