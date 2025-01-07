import { z } from 'zod'

export const credencialTypeSchema = z.enum(['login', 'signup'])
