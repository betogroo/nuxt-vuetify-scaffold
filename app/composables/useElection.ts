import {
  electionInsertSchema,
  electionRowSchema,
  electionRowsSchema,
} from '~/schemas'
import { electionUpdateSchema } from '~/schemas/election/update'
import type {
  ElectionInsert,
  ElectionRow,
  ElectionUpdate,
} from '~/types/election'

const useElection = () => {
  const {
    data: election,
    getById: getElectionById,
    getDataPending: isElectionPending,
  } = useGenericGet<ElectionRow>('election', electionRowSchema)

  const {
    data: elections,
    fetch: fetchElections,
    fetchPending: isElectionsPending,
  } = useGenericFetch<ElectionRow>('election', electionRowsSchema)

  const {
    deleteDataById: deleteElectionById,
    deletePending: isElectionDeleting,
  } = useGenericDelete('election')

  const { insert: insertElection, insertPending: isElectionInserting } =
    useGenericInsert<ElectionInsert, ElectionRow>(
      'election',
      electionInsertSchema,
    )
  const { update: updateElection, updatePending: isElectionUpdating } =
    useGenericUpdate<ElectionUpdate>('election', electionUpdateSchema)

  const supabase = useSupabaseClient()

  const channel = supabase.channel('custom-election-channel')

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
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'election' },
      (payload) => {
        console.log('Change received!')
        const parsedData = electionRowSchema.parse(payload.new)

        election.value = { ...parsedData }
      },
    )
    .subscribe((status) => {
      console.log(status)
    })

  return {
    elections,
    election,
    fetchElections,
    getElectionById,
    deleteElectionById,
    insertElection,
    updateElection,
    isElectionsPending,
    isElectionPending,
    isElectionDeleting,
    isElectionInserting,
    isElectionUpdating,
  }
}

export default useElection
