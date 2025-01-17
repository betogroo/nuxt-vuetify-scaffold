import { z } from 'zod'

import { profileRowSchema, purchasingDemandsRowsSchema } from '~/schemas'

export const purchasingDemandsWithMembersSchema = z.object({
  profile_id: profileRowSchema.shape.id,
  contracting_agent_name: profileRowSchema.shape.name,
  purchasing_demands: purchasingDemandsRowsSchema.default([]),
})
