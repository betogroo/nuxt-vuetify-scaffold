import type { PurchasingDemandDetails } from '~/types'
export const usePurchasingDemandStore = defineStore(
  'usePurchasingDemandStore',
  () => {
    const demands = ref<PurchasingDemandDetails[]>([])

    const setDemands = (newDemands: PurchasingDemandDetails[]) => {
      demands.value = newDemands
    }

    const removeDemandById = (id: number) => {
      demands.value = demands.value.filter((demand) => demand.id !== id)
    }
    return { demands, setDemands, removeDemandById }
  },
)
