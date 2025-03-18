import { z } from 'zod'

// Schema para validar uma linha completa (row)
export const offerRowSchema = z.object({
  id: uuidSchema,
  created_at: createdAtSchema,
  updated_at: createdAtSchema,
  purchasing_demand_product_id: uuidSchema,
  supplier_id: uuidSchema,
  offer_value: z
    .number({
      required_error: 'o Valor é obrigatório',
      invalid_type_error: 'O valor deve ser um número maior que ZERO',
    })
    .positive(),
})

export const offerRowsSchema = z.array(offerRowSchema)
