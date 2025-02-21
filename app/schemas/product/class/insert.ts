import { productClassRowSchema } from './row'

export const productClassInsertSchema = productClassRowSchema.pick({
  name: true,
})
