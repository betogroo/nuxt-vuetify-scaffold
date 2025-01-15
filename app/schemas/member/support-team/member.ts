import { profileRowSchema } from '~/schemas'

export const supportTeamMemberSchema = profileRowSchema.pick({
  id: true,
  name: true,
})
