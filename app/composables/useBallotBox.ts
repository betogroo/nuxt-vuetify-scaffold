import {
  ballotBoxInsertSchema,
  ballotBoxRowSchema,
  ballotBoxRowsSchema,
  ballotBoxUpdateSchema,
} from '~/schemas'
import type {
  BallotBoxInsert,
  BallotBoxRow,
  BallotBoxUpdate,
  Database,
} from '~/types'

const useBallotBox = () => {
  const { updateArrayItemById } = useHelpers()
  const supabase = useSupabaseClient<Database>()
  const channel = supabase.channel('custom-update-channel')

  const { getWithFilters: getBallotBoxesByElectionId, data: ballotBoxes } =
    useGenericGet<BallotBoxRow[]>('ballot_box', ballotBoxRowsSchema)

  const { insert: insertBallotBox, insertPending: isBallotBoxInserting } =
    useGenericInsert<BallotBoxInsert, BallotBoxRow>(
      'ballot_box',
      ballotBoxInsertSchema,
    )

  const { update: updateBallotBox, updatePending: isBallotBoxUpdating } =
    useGenericUpdate<BallotBoxUpdate>('ballot_box', ballotBoxUpdateSchema)
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
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'ballot_box',
      },
      (payload) => {
        if (ballotBoxes.value) {
          console.log(payload.old, payload.new)
          const newRecord = ballotBoxRowSchema.parse(payload.new)
          /*  const index = ballotBoxes.value.findIndex(
            (item) => item.id === payload.old.id,
          )
          if (index !== -1 && ballotBoxes.value[index])
            Object.assign(ballotBoxes.value[index], newRecord)

          console.log(newRecord, index) */
          updateArrayItemById(ballotBoxes, newRecord)
        }
      },
    )
    .subscribe()
  return {
    getBallotBoxesByElectionId,
    insertBallotBox,
    updateBallotBox,
    ballotBoxes,
    isBallotBoxInserting,
    isBallotBoxUpdating,
  }
}

export default useBallotBox
