import { z } from 'zod'

export const userLoginSchema = z.object({
  name: nameSchema.optional(),
  email: z.string().min(1, 'Campo Obrigatório').email('Email Inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})
