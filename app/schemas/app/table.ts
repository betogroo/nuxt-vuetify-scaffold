import { z } from 'zod'

export const baseTableColumnSchema = z.object({
  key: z.string().trim().optional(),
  title: z.string().trim().optional(),
  align: z
    .union([z.literal('center'), z.literal('start'), z.literal('end')])
    .optional(),
})

export const tableColumnSchema = baseTableColumnSchema.extend({
  children: z.array(baseTableColumnSchema).optional(),
})
