import { z } from 'zod'

export const actionColorSchema = z.union([
  z.literal('error'),
  z.literal('warning'),
])

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

export const navbarItemSchema = z.object({
  path: z.string(),
  title: z.string(),
})

export const navbarItemsSchema = z.array(navbarItemSchema)

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
