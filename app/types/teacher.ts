import { z } from 'zod'

import {
  teacherInsertSchema,
  type teacherRowSchema,
  type teacherUpdateSchema,
} from '~/schemas'

export type TeacherInsert = z.infer<typeof teacherInsertSchema>
export type TeacherRow = z.infer<typeof teacherRowSchema>
