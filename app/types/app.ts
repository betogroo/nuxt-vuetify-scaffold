import type { z } from 'zod'

import type { dropdownItemSchema, dropdownActivatorSchema } from '~/schemas'

export type DropdownItem = z.infer<typeof dropdownItemSchema>
export type DropdownActivatorSchema = z.infer<typeof dropdownActivatorSchema>
