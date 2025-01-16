import type { z } from 'zod'
import type {
  supportTeamRowSchema,
  supportTeamMemberSchema,
  supportTeamInsertSchema,
} from '~/schemas'

export type SupportTeam = z.infer<typeof supportTeamRowSchema>
export type SupportTeamMember = z.infer<typeof supportTeamMemberSchema>
export type SupportTeamInsert = z.infer<typeof supportTeamInsertSchema>
