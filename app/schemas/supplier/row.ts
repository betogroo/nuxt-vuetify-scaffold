import { z } from 'zod'

export const supplierRowSchema = z.object({
  id: uuidSchema,
  created_at: createdAtSchema,
  updated_at: createdAtSchema,
  name: nameSchema,
  cnpj: z.string().min(14, 'CNPJ Inválido'),
  representative: nameSchemaWithRefine,
})

export const supplierRowsSchema = z.array(supplierRowSchema)
