import { electionRowsSchema } from '~/schemas'
import type { ElectionRow } from '~/types/election'

const useElection = () => {
  const {
    data: elections,
    fetch: fetchElections,
    fetchPending: isElectionsPending,
  } = useGenericFetch<ElectionRow>('election', electionRowsSchema)

  return { elections, fetchElections, isElectionsPending }
}

export default useElection
