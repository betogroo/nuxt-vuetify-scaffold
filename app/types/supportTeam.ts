import type { z } from 'zod'
import type { supportTeamRowSchema, supportTeamMemberSchema } from '~/schemas'

export type SupportTeam = z.infer<typeof supportTeamRowSchema>
export type SupportTeamMember = z.infer<typeof supportTeamMemberSchema>
