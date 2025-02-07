import type { z } from 'zod'
import type {
  formActionsButtonSchema,
  memberOption,
  formSelectItemsSchema,
} from '~/schemas'

export type FormActionButton = z.infer<typeof formActionsButtonSchema>

// alterar o nome para algo mais genérico
export type MemberOption = z.infer<typeof memberOption>

export type FormSelectItem = z.infer<typeof formSelectItemsSchema>

export type SelectOption<T = string | number> = { name: string; value: T }
