import { z } from 'zod'

export const baseColorSchema = z.union([
  z.literal('error'),
  z.literal('warning'),
  z.literal('success'),
  z.literal('primary'),
  z.literal('secondary'),
])

export const actionColorSchema = z.union([
  z.literal('error'),
  z.literal('warning'),
])
