import { z } from 'zod'
import {
  purchasingDemandsRowSchema,
  profileRowSchema,
  supportTeamMemberSchema,
} from '~/schemas'

export const purchasingDemandDetailsRowSchema = purchasingDemandsRowSchema
  .pick({
    id: true,
    created_at: true,
    ptres_number: true,
    description: true,
    contracting_agent_id: true,
  })
  .extend({
    contracting_agent_name: profileRowSchema.shape.name.optional(),
    support_team: z.array(supportTeamMemberSchema).optional().nullable(),
  })

export const purchasingDemandDetailsRowsSchema = z.array(
  purchasingDemandDetailsRowSchema,
)
