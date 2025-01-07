import { z } from 'zod'

export const pendingStateSchema = z.object({
  action: z.string().nullable(),
  itemId: z.union([z.string(), z.number()]).nullable(),
  isLoading: z.boolean().default(false),
})

export const pendingOptionsSchema = z.object({
  itemId: z.union([z.string(), z.number().positive()]).optional(),
  delay: z.number().positive().optional(),
})
