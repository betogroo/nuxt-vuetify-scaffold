import type {
  PurchasingDemandInsert,
  PurchasingDemand,
  DemandWithAgent,
  DemandDetails,
} from '~/types'
import {
  purchasingDemandsInsertSchema,
  purchasingDemandsRowsSchema,
  purchasingDemandWithContractingAgentSchema,
} from '~/schemas'

const usePurchasingDemand = () => {
  const { insertPending: purchasingPending, insert: insertPurchasingDemand } =
    useGenericInsert<PurchasingDemandInsert, PurchasingDemand>(
      'purchasing_demands',
      purchasingDemandsInsertSchema,
    )

  const {
    fetchPending: purchasingFetchPending,
    fetch: fetchPurchasingDemands,
    data: purchasingDemands,
  } = useGenericFetch<PurchasingDemand>(
    'purchasing_demands',
    purchasingDemandsRowsSchema,
  )

  const { getById: getPurchasingDemandById, data: purchasingDemand } =
    useGenericGet<DemandWithAgent>(
      'purchasing_demands',
      purchasingDemandWithContractingAgentSchema,
      `
    id,
    created_at,
    ptres_number,
    description,
    contracting_agent_id,
    created_by,
    profiles:contracting_agent_id(id, name, username)
  `,
    )

  const purchasingDemandDetails = computed<DemandDetails>(() => {
    return {
      id: purchasingDemand.value!.id,
      contracting_agent_id: purchasingDemand.value!.contracting_agent_id,
      ptres_number: purchasingDemand.value!.ptres_number,
      description: purchasingDemand.value!.description,
      profile_name: purchasingDemand.value!.profiles.name,
      profile_username: purchasingDemand.value!.profiles.username,
    }
  })

  return {
    purchasingPending,
    insertPurchasingDemand,
    purchasingFetchPending,
    fetchPurchasingDemands,
    purchasingDemands,
    getPurchasingDemandById,
    purchasingDemand,
    purchasingDemandDetails,
  }
}

export default usePurchasingDemand
