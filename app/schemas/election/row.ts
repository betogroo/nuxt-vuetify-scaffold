import { z } from 'zod'

export const electionStatusSchema = z.union([
  z.literal('created'),
  z.literal('started'),
  z.literal('paused'),
  z.literal('finished'),
])
export const electionRowSchema = z.object({
  id: uuidSchema,
  created_at: createdAtSchema,
  updated_at: createdAtSchema,
  name: nameSchema,
  date: z.string().date(),
  status: electionStatusSchema,
})
export const electionRowsSchema = z.array(electionRowSchema)

/* election: {
  Row: {
    created_at: string
    date: string
    id: string
    name: string
    updated_at: string
  }
  Insert: {
    created_at?: string
    date: string
    id?: string
    name: string
    updated_at?: string
  }
  Update: {
    created_at?: string
    date?: string
    id?: string
    name?: string
    updated_at?: string
  }
 */
