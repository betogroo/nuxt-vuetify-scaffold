import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from 'vue-router'
import type { z } from 'zod'
import type { pendingOptionsSchema, pendingStateSchema } from '~/schemas'

import type { Database } from '~/types/supabase'
export type { PostgrestError } from '@supabase/supabase-js'

export type To =
  | RouteLocationAsRelativeGeneric
  | RouteLocationAsPathGeneric
  | string

export type PendingState = z.infer<typeof pendingStateSchema>
export type PendingOptions = z.infer<typeof pendingOptionsSchema>
export type SelectOption<T = string> = { name: string; value: T }

export type Tables = keyof Database['public']['Tables']
export type { Database }
