import { productClassRowSchema } from './row'

export const productClassUpdateSchema = productClassRowSchema.partial({
  id: true,
  created_at: true,
  name: true,
})
