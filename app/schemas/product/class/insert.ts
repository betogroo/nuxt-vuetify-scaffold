import { productClassRowSchema } from './row'

export const productClassInsertSchema = productClassRowSchema.pick({
  id: true,
  name: true,
})
