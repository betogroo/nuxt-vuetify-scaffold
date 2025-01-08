import type { Database, SupportTeam } from '~/types'
const useSupportTeam = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()
  const availableSupportTeamProfile = ref<SupportTeam[]>([])
  const designedSupportTeamProfile = ref<SupportTeam[]>([])

  const getAvailableSupportTeam = async (process_id: number) => {
    return setPendingState(async () => {
      const { data, error } = await supabase.rpc('get_available_support_team', {
        process_id,
      })
      console.log(data)
      if (error) throw error
      if (data) availableSupportTeamProfile.value = data
    }, 'get-available-support_team')
  }

  const getDesignedSupportTeam = async (process_id: number) => {
    return setPendingState(async () => {
      const { data, error } = await supabase.rpc('get_designed_support_team', {
        process_id,
      })
      console.log(data)
      if (error) throw error
      if (data) designedSupportTeamProfile.value = data
    }, 'get-designed-support_team')
  }

  return {
    getAvailableSupportTeam,
    getDesignedSupportTeam,
    availableSupportTeamProfile,
    designedSupportTeamProfile,
    isPending,
  }
}

export default useSupportTeam
