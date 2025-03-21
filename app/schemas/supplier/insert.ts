import { supplierRowSchema } from '~/schemas'

export const supplierInsertSchema = supplierRowSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})
