import { z } from 'zod'
import { actionColorSchema } from '~/schemas'

export const dropdownItemSchema = z.object({
  label: z.string().trim().optional(),
  icon: z.string().optional(),
  color: actionColorSchema.optional(),
  avatar: z.string().optional(),
  action: z
    .function()
    .args()
    .returns(z.union([z.void(), z.promise(z.void()), z.unknown()]))
    .optional(),
})
export const dropdownItemsSchema = z.array(dropdownItemSchema)

export const dropdownActivatorSchema = z.object({
  type: z.union([z.literal('icon'), z.literal('avatar')]),
  value: z.string(),
})
