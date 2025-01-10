import type { PurchasingDemandDetails, TableColumn, Database } from '~/types'
import { purchasingDemandDetailsRowsSchema } from '~/schemas'
const usePurchasingDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const { setPendingState, isPending: purchasing_demand_details_pending } =
    useHelpers()

  const demands = ref<PurchasingDemandDetails[]>([])

  const fetchPurchasingDemandRows = async () => {
    await setPendingState(async () => {
      const { data: newData, error } = await supabase.rpc(
        'fetch_purchasing_demands',
      )
      if (error) throw error
      if (newData) {
        const parsedData = purchasingDemandDetailsRowsSchema.parse(newData)
        demands.value = parsedData
      }
    }, 'fetch-purchasing-demand-details')
  }

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
      key: 'contracting_agent_name',
      title: 'Agente de Contratação',
    },
    {
      title: 'Equipe de apoio',
      key: 'support_team',
    },
  ]

  return {
    fetchPurchasingDemandRows,
    demandTableColumns: tableColumns,
    demands,
    purchasing_demand_details_pending,
  }
}

export default usePurchasingDemand
