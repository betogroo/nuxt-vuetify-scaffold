import { z } from 'zod'

export const formActionsButtonSchema = z.object({
  isPending: z.boolean(),
  disabled: z.boolean(),
  label: z.string(),
  action: z
    .function()
    .args()
    .returns(z.union([z.void(), z.promise(z.void()), z.unknown()]))
    .optional(),
})

export const formSelectItemsSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: nameSchema,
})
