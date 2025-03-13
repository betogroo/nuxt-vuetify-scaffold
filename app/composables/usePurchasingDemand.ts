import type {
  PurchasingDemandDetails,
  PurchasingDemandInsert,
  PurchasingDemand,
  TableColumn,
  Database,
  AgentWithDemands,
  Ptres,
} from '~/types'
import {
  //purchasingDemandDetailsRowSchema,
  purchasingDemandsRowSchema,
  purchasingDemandDetailsRowsSchema,
  purchasingDemandsWithMembersSchema,
  purchasingDemandsInsertSchema,
} from '~/schemas'

// for test
const delay = ref(0)

const usePurchasingDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const demandStore = usePurchasingDemandStore()
  const { setPendingState, isPending: purchasingDemandDetailsPending } =
    useHelpers()

  const demand = ref<PurchasingDemandDetails>()
  const demands = ref<PurchasingDemandDetails[]>([])
  const agentWithDemands = ref<AgentWithDemands>()

  const { deleteDataById: deleteDemandById, deletePending: isDeletingDemand } =
    useGenericDelete<PurchasingDemand>('purchasing_demands')

  const {
    insertPending: purchasingInsertPending,
    insert: insertPurchasingDemand,
  } = useGenericInsert<PurchasingDemandInsert, PurchasingDemand>(
    'purchasing_demands',
    purchasingDemandsInsertSchema,
  )

  const fetchPurchasingDemandRows = async () => {
    await setPendingState(
      async () => {
        const { data: newData, error } = await supabase.rpc(
          'fetch_purchasing_demands',
        )
        if (error) throw error
        if (newData) {
          const parsedData = purchasingDemandDetailsRowsSchema.parse(newData)
          //demands.value = parsedData
          demandStore.setDemands(parsedData)
        }
      },
      'fetch-purchasing-demand-details',
      { delay: delay.value },
    )
  }

  const fetchPurchasingDemandsByMember = async (id: string) => {
    await setPendingState(async () => {
      const { data: newData, error } = await supabase
        .from('profiles')
        .select(
          `
        profile_id:id,
        contracting_agent_name:name,
        purchasing_demands!purchasing_demands_contracting_agent_id_fkey(
          *
        )
        `,
        )
        .eq('id', id)
        .returns<AgentWithDemands>()
        .single()

      if (error) console.error(error)
      if (newData) {
        const parsedData = purchasingDemandsWithMembersSchema.parse(newData)
        agentWithDemands.value = parsedData
      }
    }, 'fetch-purchasing-demands-by-member')
  }

  /* const getPurchasingDemand = async (demand_id: number) => {
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
  } */

  const {
    data: purchasingDemand,
    getById: getPurchasingDemandById,
    getDataPending: isPurchasingDemandPending,
  } = useGenericGet<PurchasingDemand>(
    'purchasing_demands',
    purchasingDemandsRowSchema,
  )

  const demandNumber = (demand: number | string, createdAt: string): string =>
    `${demand.toString().padStart(5, '0')}/${getYear(createdAt)}`

  const title = (description: string, ptres_number: Ptres) =>
    `${description} (${ptres_number})`

  const subtitle = (id: string | number, created_at: string) =>
    `Processo ${demandNumber(id, created_at!)}`

  const tableColumns: TableColumn[] = [
    {
      key: 'id',
      title: 'Processo',
      width: '50px',
    },
    {
      key: 'ptres_number',
      title: 'PTRES',
      width: '50px',
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
    {
      key: 'actions',
    },
  ]

  const channel = supabase.channel('custom-demand-channel')

  channel
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'purchasing_demands' },
      (payload) => {
        demandStore.removeDemandById(payload.old.id)
      },
    )
    .subscribe()

  return {
    demand,
    demands,
    demandTableColumns: tableColumns,
    purchasingDemandDetailsPending,
    //getPurchasingDemand,
    fetchPurchasingDemandRows,
    fetchPurchasingDemandsByMember,
    insertPurchasingDemand,
    agentWithDemands,
    title,
    subtitle,
    demandNumber,
    purchasingInsertPending,
    deleteDemandById,
    isDeletingDemand,
    purchasingDemand,
    getPurchasingDemandById,
    isPurchasingDemandPending,
  }
}

export default usePurchasingDemand
