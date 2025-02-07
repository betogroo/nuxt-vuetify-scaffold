import { z } from 'zod'

export const productClassRowSchema = z.object({
  id: numberRequiredSchema,
  created_at: createdAtSchema,
  name: nameSchema,
})

export const productClassRowsSchema = z.array(productClassRowSchema)
