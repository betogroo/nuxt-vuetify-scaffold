import { z } from 'zod'

export const dropdownItemSchema = z.object({
  label: z.string().trim().optional(),
  icon: z.string().optional(),
  avatar: z.string().optional(),
  action: z
    .function()
    .args()
    .returns(z.union([z.void(), z.promise(z.void()), z.unknown()]))
    .optional(),
})
export const dropdownItemsSchema = z.array(dropdownItemSchema)
