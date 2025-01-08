import { z } from 'zod'

export const teacherAvailabilityUpdateSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  day_of_week: dayOfWeekSchema.optional(),
  is_available: z.boolean().optional(),
  teacher_id: uuidSchema.optional(),
  time_slot_id: z.number().optional(),
})
