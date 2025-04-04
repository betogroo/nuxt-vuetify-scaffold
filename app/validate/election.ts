import { toTypedSchema } from '@vee-validate/zod'
import { electionInsertSchema } from '~/schemas'

export const validateElectionInsertSchema = toTypedSchema(electionInsertSchema)
