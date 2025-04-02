import { electionRowSchema, electionRowsSchema } from '~/schemas'
import type { ElectionRow } from '~/types/election'

const useElection = () => {
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
