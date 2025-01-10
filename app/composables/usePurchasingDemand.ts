import type { PurchasingDemandDetails, TableColumn, Database } from '~/types'
import {
  purchasingDemandDetailsRowSchema,
  purchasingDemandDetailsRowsSchema,
} from '~/schemas'

// for test
const delay = ref(0)
const usePurchasingDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const { setPendingState, isPending: purchasing_demand_details_pending } =
    useHelpers()

  const demand = ref<PurchasingDemandDetails>()
  const demands = ref<PurchasingDemandDetails[]>([])

  const fetchPurchasingDemandRows = async () => {
    await setPendingState(
      async () => {
        const { data: newData, error } = await supabase.rpc(
          'fetch_purchasing_demands',
        )
        if (error) throw error
        if (newData) {
          const parsedData = purchasingDemandDetailsRowsSchema.parse(newData)
          demands.value = parsedData
        }
      },
      'fetch-purchasing-demand-details',
      { delay: delay.value },
    )
  }

  const getPurchasingDemand = async (demand_id: number) => {
    await setPendingState(
      async () => {
        const { data: newData, error } = await supabase
          .rpc('get_purchasing_demand', {
            demand_id,
          })
          .single()
        if (error) throw error
        if (newData) {
          const parsedData = purchasingDemandDetailsRowSchema.parse(newData)
          demand.value = parsedData
        }
      },
      'get-purchasing-demand',
      { delay: delay.value },
    )
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
    demand,
    demands,
    demandTableColumns: tableColumns,
    purchasing_demand_details_pending,
    getPurchasingDemand,
    fetchPurchasingDemandRows,
  }
}

export default usePurchasingDemand
