import { z } from 'zod'

export const ptresNumberSchema = z
  .union([z.literal('180205'), z.literal('180211')])
  .superRefine((val, ctx) => {
    if (val === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Escolha um valor válido.',
      })
    }
  })

export const purchasingDemandsRowSchema = z.object({
  id: z.number(),
  contracting_agent_id: z.string().uuid(),
  created_by: z.string().nullable(),
  updated_at: z.string().optional(),
  created_at: z.string().optional(),
  ptres_number: ptresNumberSchema,
  ac_number: z.string().min(1, 'O campo não pode ser vazio').nullable(),
  external_process_number: z
    .string()
    .min(1, 'O campo não pode ser vazio')
    .nullable(),
  description: z.string().min(1, 'O campo não pode ser vazio'),
})
export const purchasingDemandsRowsSchema = z.array(purchasingDemandsRowSchema)
