import type { DemandsWithAgent } from '~/types'
const useDetailedPurchasing = () => {
  const { profiles: agents, fetchProfiles: fetchAgents } = useProfile()
  const { purchasingDemands, fetchPurchasingDemands } = usePurchasingDemand()

  const detailedPurchasingRows = computed<DemandsWithAgent>(() => {
    if (!agents.value || !purchasingDemands.value) return []

    const agentsMap = new Map(
      agents.value.map((agent) => [agent.id, agent.name]),
    )
    return purchasingDemands.value.map((purchasing) => ({
      ...purchasing,
      contracting_agent:
        agentsMap.get(purchasing.contracting_agent_id) || 'UnKnow',
    }))
  })
  return { agents, fetchAgents, fetchPurchasingDemands, detailedPurchasingRows }
}

export default useDetailedPurchasing
