<script setup lang="ts">
  const { id } = useValidateParam()

  const { election, getElectionById } = useElection()
  const { ballotBoxes, getBallotBoxesByElectionId } = useBallotBox()

  onMounted(async () => {
    if (!id) return
    await getElectionById(id)
    await getBallotBoxesByElectionId({ election_id: id })
  })
</script>

<template>
  <v-container>
    <AppCard
      v-if="election"
      :title="election?.name"
    >
      <AppCard title="Urnas">
        {{ ballotBoxes }}
      </AppCard>
    </AppCard>
  </v-container>
</template>
