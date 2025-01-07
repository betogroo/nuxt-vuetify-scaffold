import { z } from 'zod'

export const teacherAvailabilityRowSchema = z.object({
  id: uuidSchema,
  created_at: z.string(),
  day_of_week: dayOfWeekSchema,
  is_available: z.boolean(),
  teacher_id: uuidSchema,
  time_slot_id: z.number(),
})
export const teacherAvailabilityRowsSchema = z.array(
  teacherAvailabilityRowSchema,
)
