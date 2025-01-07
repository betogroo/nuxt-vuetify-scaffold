import { toTypedSchema } from '@vee-validate/zod'
import { documentDemandInsertSchema } from '~/schemas'

export const validateDocumentDemand = toTypedSchema(documentDemandInsertSchema)
