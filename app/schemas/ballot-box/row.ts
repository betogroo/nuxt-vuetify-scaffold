/* ballot_box: {
    Row: {
      created_at: string
      election_id: string | null
      id: number
      name: string
      updated_at: string
    }
    Insert: {
      created_at?: string
      election_id?: string | null
      id?: number
      name: string
      updated_at?: string
    }
    Update: {
      created_at?: string
      election_id?: string | null
      id?: number
      name?: string
      updated_at?: string
    } */

import { z } from 'zod'

export const ballotBoxRowSchema = z.object({
  id: uuidSchema,
  created_at: createdAtSchema,
  updated_at: createdAtSchema,
  name: nameSchema,
  site: z.string().min(2, 'Deve conter pelo menos dois caracteres').nullable(),
  election_id: uuidSchema,
})

export const ballotBoxRowsSchema = z.array(ballotBoxRowSchema)
