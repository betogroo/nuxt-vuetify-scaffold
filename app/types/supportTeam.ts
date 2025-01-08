import type { z } from 'zod'
import type { supportTeamRowSchema } from '~/schemas'

export type SupportTeam = z.infer<typeof supportTeamRowSchema>
