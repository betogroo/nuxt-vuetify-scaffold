import { productRowSchema } from './row'

export const productInsertSchema = productRowSchema
  .omit({
    id: true,
    created_at: true,
  })
  .partial({
    pdm_number: true,
  })
