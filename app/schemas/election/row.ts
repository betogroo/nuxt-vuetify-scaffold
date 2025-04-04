import { z } from 'zod'

export const electionRowSchema = z.object({
  id: uuidSchema,
  created_at: createdAtSchema,
  updated_at: createdAtSchema,
  name: nameSchema,
  date: z.string().date(),
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
