import { ballotBoxRowsSchema } from '~/schemas'
import type { BallotBoxRow } from '~/types'

const useBallotBox = () => {
  const { getWithFilters: getBallotBoxesByElectionId, data: ballotBoxes } =
    useGenericGet<BallotBoxRow[]>('ballot_box', ballotBoxRowsSchema)
  return { getBallotBoxesByElectionId, ballotBoxes }
}

export default useBallotBox
