import { offerRowSchema } from './row'

export const offerInsertSchema = offerRowSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
  })
  .partial({
    purchasing_demand_product_id: true,
  })
