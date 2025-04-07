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
        <div class="d-flex flex-wrap justify-center">
          <v-card
            v-for="item in ballotBoxes"
            :key="item.id"
            class="pa-1 ma-1"
            :title="item.name"
            variant="outlined"
            width="240"
          />
        </div>
      </AppCard>
    </AppCard>
  </v-container>
</template>
