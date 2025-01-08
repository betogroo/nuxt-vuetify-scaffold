import { toTypedSchema } from '@vee-validate/zod'
import { teacherInsertSchema } from '~/schemas/'

export const validateTeacher = toTypedSchema(teacherInsertSchema)
