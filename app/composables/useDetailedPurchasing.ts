import type { DemandsWithAgent, DemandWithAgent, TableColumn } from '~/types'
const useDetailedPurchasing = () => {
  const { profiles: agents, fetchProfiles: fetchAgents } = useProfile()
  const {
    purchasingDemand,
    purchasingDemands,
    getPurchasingDemandById,
    fetchPurchasingDemands,
  } = usePurchasingDemand()

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
  const detailedPurchasingRow = computed<DemandWithAgent>(() => {
    if (!agents.value || !purchasingDemand.value)
      return {
        id: '',
        description: '',
        contracting_agent: '',
        contracting_agent_id: '',
      }
    const agentsMap = new Map(
      agents.value.map((agent) => [agent.id, agent.name]),
    )
    return {
      ...purchasingDemand.value,
      contracting_agent:
        agentsMap.get(purchasingDemand.value.contracting_agent_id) ||
        'não definido',
    }
  })

  const tableColumns: TableColumn[] = [
    {
      key: 'id',
      title: 'Processo',
    },
    {
      key: 'ptres_number',
      title: 'PTRES',
    },
    {
      key: 'description',
      title: 'Descrição',
    },
    {
      key: 'contracting_agent',
      title: 'Agente de Contratação',
    },
    {
      title: 'Equipe de apoio',
    },
  ]

  return {
    agents,
    tableColumns,
    fetchAgents,
    fetchPurchasingDemands,
    getPurchasingDemandById,
    detailedPurchasingRows,
    detailedPurchasingRow,
  }
}

export default useDetailedPurchasing
