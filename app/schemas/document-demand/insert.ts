import { z } from 'zod'
import { documentDemandRowSchema } from '~/schemas'

export const documentDemandInsertSchema = z.object({
  created_at: documentDemandRowSchema.shape.created_at.optional(),
  document_number: z
    .string()
    .min(10, 'Digite o documento no padrão 00000000-0'),
  id: documentDemandRowSchema.shape.id.optional(),
  name: nameSchemaWithRefine,
  status: documentDemandRowSchema.shape.status.optional(),
  site: documentDemandRowSchema.shape.site,
  type: documentDemandRowSchema.shape.type,
  updated_at: documentDemandRowSchema.shape.updated_at.optional(),
  user_id: uuidSchema,
  note: documentDemandRowSchema.shape.note.optional(),
})
