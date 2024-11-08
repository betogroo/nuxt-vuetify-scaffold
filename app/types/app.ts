import type { z } from 'zod'

import type { dropdownItemSchema } from '~/schemas'

export type DropdownItem = z.infer<typeof dropdownItemSchema>
