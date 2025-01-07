import { z } from 'zod'

export const teacherAvailabilityInsertSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  day_of_week: dayOfWeekSchema,
  is_available: z.boolean().optional(),
  teacher_id: uuidSchema,
  time_slot_id: z.number(),
})
