import {
  supportTeamRowSchema,
  profileRowsSchema,
  purchasingDemandsRowSchema,
} from '~/schemas'
import type { SupportTeam, Profile, PurchasingDemand } from '~/types'

export const useSupportTeamStoreStore = defineStore(
  'useSupportTeamStore',
  () => {
    const { data: profiles, fetch } = useGenericFetch<Profile>(
      'profiles',
      profileRowsSchema,
    )

    const double = (num: number) => num * 2

    const test = computed(() => (num: number) => double(num))

    const availableSupportTeam = computed(
      () => (id: string, demand: PurchasingDemand) => {
        console.log(id, demand)
        return profiles.value.filter(
          (item) => item.id !== demand.contracting_agent_id,
        )
      },
    )

    return { profiles, fetch, test, availableSupportTeam }
  },
)
