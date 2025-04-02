import { electionRowSchema, electionRowsSchema } from '~/schemas'
import type { ElectionRow } from '~/types/election'

const useElection = () => {
  const supabase = useSupabaseClient()
  const {
    data: elections,
    fetch: fetchElections,
    fetchPending: isElectionsPending,
  } = useGenericFetch<ElectionRow>('election', electionRowsSchema)

  const channel = supabase.channel('custom-update-channel')

  channel
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'election' },
      (payload) => {
        const newElection = electionRowSchema.parse(payload.new)
        elections.value = [...elections.value, newElection]
      },
    )
    .subscribe()

  const {
    data: election,
    getById: getElectionById,
    getDataPending: isElectionPending,
  } = useGenericGet<ElectionRow>('election', electionRowSchema)

  return {
    elections,
    election,
    fetchElections,
    getElectionById,
    isElectionsPending,
    isElectionPending,
  }
}

export default useElection
