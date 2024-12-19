import type {
  PurchasingDemandInsert,
  PurchasingDemand,
  TableColumn,
} from '~/types'
import {
  purchasingDemandsInsertSchema,
  purchasingDemandsRowSchema,
  purchasingDemandsRowsSchema,
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
    useGenericGet<PurchasingDemand>(
      'purchasing_demands',
      purchasingDemandsRowSchema,
    )

  const columns: TableColumn[] = [
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
    purchasingPending,
    insertPurchasingDemand,
    purchasingFetchPending,
    fetchPurchasingDemands,
    purchasingDemands,
    columns,
    getPurchasingDemandById,
    purchasingDemand,
  }
}

export default usePurchasingDemand
