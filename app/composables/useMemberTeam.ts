import type { Database, SupportTeamMember } from '~/types'
const useMemberTeam = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()
  const availableSupportTeamMember = ref<SupportTeamMember[]>([])
  const designedSupportTeamMember = ref<SupportTeamMember[]>([])

  const { profiles: members, fetchProfiles: fetchMembers } = useProfile()

  const getAvailableSupportTeam = async (process_id: number) => {
    return setPendingState(async () => {
      const { data, error } = await supabase.rpc('get_available_support_team', {
        process_id,
      })
      console.log(data)
      if (error) throw error
      if (data) availableSupportTeamMember.value = data
    }, 'get-available-support_team')
  }

  const getDesignedSupportTeam = async (process_id: number) => {
    return setPendingState(async () => {
      const { data, error } = await supabase.rpc('get_designed_support_team', {
        // mudar retorno da function no supa
        process_id,
      })
      console.log(data)
      if (error) throw error
      if (data) designedSupportTeamMember.value = data
    }, 'get-designed-support_team')
  }

  const getContractingAgentsById = async (id: string) => {
    return setPendingState(async () => {
      console.log('Listar os Processos do Agente de Conrtatação', id)
    }, 'get-contracting-agents-by-id')
  }

  return {
    getAvailableSupportTeam,
    getDesignedSupportTeam,
    getContractingAgentsById,
    fetchMembers,
    availableSupportTeamMember,
    designedSupportTeamMember,
    isPending,
    members,
  }
}

export default useMemberTeam
