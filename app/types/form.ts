import type { z } from 'zod'
import type { formActionsButtonSchema } from '~/schemas'

export type FormActionButton = z.infer<typeof formActionsButtonSchema>
