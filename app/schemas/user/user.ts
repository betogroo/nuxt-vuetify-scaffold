import { z } from 'zod'

const baseUserSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().optional(),
  name: z.string().min(8, 'Campo Obrigatório'),
  email: z.string().min(1, 'Campo Obrigatório').email('Email Inválido'),
})

export const addUserSchema = baseUserSchema.omit({
  id: true,
  created_at: true,
})

export const editUserSchema = baseUserSchema.partial().extend({
  id: z.string().uuid(),
})

export const viewUserSchema = baseUserSchema
