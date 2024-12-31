import type { Database } from '~/types/supabase'
const useSupportTeam = () => {
  const supabase = useSupabaseClient<Database>()
  const availableSupportTeamProfile = ref<
    Database['public']['Functions']['get_available_profiles']['Returns']
  >([])
  const supportTeam = ref<
    Database['public']['Functions']['get_available_profiles']['Returns']
  >([]) // criar schema and type

  const fetchAvailableSupportTeam = async (process_id: number) => {
    const { data, error } = await supabase.rpc('get_available_profiles', {
      process_id,
    })
    if (error) console.error(error)
    else availableSupportTeamProfile.value = data
  }

  const fetchSupportTeam = async (process_id: string | number) => {
    const { data, error } = await supabase
      .from('support_team')
      .select('process_id, profiles(id, username, name, updated_at)')
      .eq('process_id', process_id) // ID do processo que você quer consultar
    if (!error) supportTeam.value = data
  }

  return {
    fetchAvailableSupportTeam,
    availableSupportTeamProfile,
    fetchSupportTeam,
    supportTeam,
  }
}

export default useSupportTeam
