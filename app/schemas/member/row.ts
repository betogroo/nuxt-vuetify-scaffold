import { profileRowSchema } from '~/schemas'

export const memberSchema = profileRowSchema

export const memberOption = memberSchema.pick({
  id: true,
  name: true,
})

export const supportTeamMemberSchema = memberSchema.pick({
  id: true,
  name: true,
})
