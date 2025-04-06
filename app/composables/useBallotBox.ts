import { ballotBoxRowSchema, ballotBoxRowsSchema } from '~/schemas'
import type { BallotBoxRow, Database } from '~/types'

const useBallotBox = () => {
  const supabase = useSupabaseClient<Database>()
  const { getWithFilters: getBallotBoxesByElectionId, data: ballotBoxes } =
    useGenericGet<BallotBoxRow[]>('ballot_box', ballotBoxRowsSchema)

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
    .subscribe()
  return { getBallotBoxesByElectionId, ballotBoxes }
}

export default useBallotBox
