import type { z } from 'zod'
import type { formActionsButtonSchema, memberOption } from '~/schemas'

export type FormActionButton = z.infer<typeof formActionsButtonSchema>

export type MemberOption = z.infer<typeof memberOption>
