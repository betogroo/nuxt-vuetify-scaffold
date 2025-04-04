import {
  electionInsertSchema,
  electionRowSchema,
  electionRowsSchema,
} from '~/schemas'
import type { ElectionInsert, ElectionRow } from '~/types/election'

const useElection = () => {
  const supabase = useSupabaseClient()
  const {
    data: elections,
    fetch: fetchElections,
    fetchPending: isElectionsPending,
  } = useGenericFetch<ElectionRow>('election', electionRowsSchema)

  const {
    data: election,
    getById: getElectionById,
    getDataPending: isElectionPending,
  } = useGenericGet<ElectionRow>('election', electionRowSchema)

  const {
    deleteDataById: deleteElectionById,
    deletePending: isElectionDeleting,
  } = useGenericDelete('election')

  const { insert: insertElection, insertPending: isElectionInserting } =
    useGenericInsert<ElectionInsert, ElectionRow>(
      'election',
      electionInsertSchema,
    )

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
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'election',
      },
      (payload) => {
        elections.value = elections.value.filter(
          (election) => election.id! != payload.old.id,
        )
      },
    )
    .subscribe()

  return {
    elections,
    election,
    fetchElections,
    getElectionById,
    deleteElectionById,
    insertElection,
    isElectionsPending,
    isElectionPending,
    isElectionDeleting,
    isElectionInserting,
  }
}

export default useElection
