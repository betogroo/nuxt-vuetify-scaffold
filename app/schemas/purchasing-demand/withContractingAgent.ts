import { z } from 'zod'
import { profileRowSchema, purchasingDemandsRowSchema } from '~/schemas'

/* export const ptresNumberSchema = z
  .union([z.literal('180205'), z.literal('180211')])
  .optional() */
/* desta maneira é aceito o valor undefined como default, 
porém não valida o formulário caso nao seja preenchido */

export const purchasingDemandWithContractingAgentSchema =
  purchasingDemandsRowSchema.extend({
    profiles: profileRowSchema,
  })

export const purchasingDemandsWithContractingAgentRowsSchema = z.array(
  purchasingDemandWithContractingAgentSchema,
)

export const purchasingDemandDetailsSchema = z.object({
  ...purchasingDemandsRowSchema.shape,
  ...profileRowSchema.shape,
})
