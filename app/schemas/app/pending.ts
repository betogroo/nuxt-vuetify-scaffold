import { z } from 'zod'

const pendingItem = z
  .union([z.string(), z.number(), z.record(z.unknown())])
  .nullable()
  .optional()

export const pendingStateSchema = z.object({
  action: z.string().nullable(),
  pendingItem: pendingItem,
  isLoading: z.boolean().default(false),
})

export const pendingOptionsSchema = z.object({
  pendingItem: pendingItem,
  delay: z.number().positive().optional(),
})
