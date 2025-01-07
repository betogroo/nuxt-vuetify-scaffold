import { z } from 'zod'

export const navbarItemSchema = z.object({
  path: z.string(),
  title: z.string(),
})

export const navbarItemsSchema = z.array(navbarItemSchema)
