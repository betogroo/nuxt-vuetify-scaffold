import type { PurchasingDemandDetails, TableColumn } from '~/types'
import { purchasingDemandDetailsRowsSchema } from '~/schemas'
const usePurchasingDemand = () => {
  const supabase = useSupabaseClient()

  const demands = ref<PurchasingDemandDetails[]>([])

  const fetchPurchasingDemandRows = async () => {
    try {
      const { data, error } = await supabase.rpc('fetch_purchasing_demands')
      if (error) throw error
      const parsedData = purchasingDemandDetailsRowsSchema.parse(data)
      demands.value = parsedData
    } catch (error) {
      console.error(error)
    }
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
  }
}

export default usePurchasingDemand
