import {
  ballotBoxInsertSchema,
  ballotBoxRowSchema,
  ballotBoxRowsSchema,
} from '~/schemas'
import type { BallotBoxInsert, BallotBoxRow, Database } from '~/types'

const useBallotBox = () => {
  const { getWithFilters: getBallotBoxesByElectionId, data: ballotBoxes } =
    useGenericGet<BallotBoxRow[]>('ballot_box', ballotBoxRowsSchema)

  const { insert: insertBallotBox, insertPending: isBallotBoxInserting } =
    useGenericInsert<BallotBoxInsert, BallotBoxRow>(
      'ballot_box',
      ballotBoxInsertSchema,
    )
  const supabase = useSupabaseClient<Database>()

  const channel = supabase.channel('custom-update-channel')
  channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'ballot_box',
      },
      (payload) => {
        const newRecord = ballotBoxRowSchema.parse(payload.new)
        ballotBoxes.value = [...(ballotBoxes.value || []), newRecord]
        console.log(payload)
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'ballot_box',
      },
      (payload) => {
        ballotBoxes.value =
          ballotBoxes.value?.filter((item) => item.id !== payload.old.id) || []
      },
    )
    .subscribe()
  return {
    getBallotBoxesByElectionId,
    insertBallotBox,
    ballotBoxes,
    isBallotBoxInserting,
  }
}

export default useBallotBox
