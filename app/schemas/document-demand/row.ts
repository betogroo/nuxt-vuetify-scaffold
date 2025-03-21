import { z } from 'zod'

export const demandStatusSchema = z.union([
  z.literal('new'),
  z.literal('consulted'),
  z.literal('released'),
  z.literal('issued'),
  z.literal('error'),
])
export const demandSiteSchema = z.union([
  z.literal('1062-9'),
  z.literal('1342-5'),
])

export const demandTypeSchema = z.union([
  z.literal('1cin'),
  z.literal('2cin'),
  z.literal('1v'),
  z.literal('2v'),
  z.literal('2t'),
  z.literal('1ve'),
  z.literal('2ve'),
])

export const documentDemandRowSchema = z.object({
  created_at: z.string().nullable(),
  document_number: z.string(),
  id: z.number(),
  name: z.string().min(1, 'Campo Obrigatório').trim(),
  status: demandStatusSchema,
  site: demandSiteSchema,
  type: demandTypeSchema,
  updated_at: z.string().nullable(),
  user_id: uuidSchema,
  note: z.string().nullable(),
})
