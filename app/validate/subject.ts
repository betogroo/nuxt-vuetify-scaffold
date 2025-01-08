import { toTypedSchema } from '@vee-validate/zod'
import { subjectInsertSchema } from '~/schemas'

export const validateSubject = toTypedSchema(subjectInsertSchema)
