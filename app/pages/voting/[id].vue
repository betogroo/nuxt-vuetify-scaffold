<script setup lang="ts">
  const { id } = useValidateParam()

  const { election, getElectionById, updateElection, isElectionUpdating } =
    useElection()

  const { ballotBoxes, getBallotBoxesByElectionId } = useBallotBox()

  const startElection = async () => {
    if (id) await updateElection(id, { status: 'started' })
  }
  const finishElection = async () => {
    if (id) await updateElection(id, { status: 'finished' })
  }
  const getReport = () => {
    console.log('Report', election)
  }

  onMounted(async () => {
    await getElectionById(id!)
    await getBallotBoxesByElectionId({ election_id: id! })
  })
</script>

<template>
  <v-container>
    <AppCard
      v-if="election"
      :loading="isElectionUpdating.isLoading"
      :subtitle="election.status"
      :title="election?.name"
    >
      <v-btn
        v-if="election.status === 'created'"
        color="primary"
        :loading="isElectionUpdating.isLoading"
        @click="startElection"
        >Iniciar Eleição</v-btn
      >
      <v-btn
        v-if="election.status === 'started'"
        color="primary"
        :loading="isElectionUpdating.isLoading"
        @click="finishElection"
        >Finalizar Eleição</v-btn
      >
      <v-btn
        v-if="election.status === 'finished'"
        color="primary"
        @click="getReport"
        >Gerar Relatório</v-btn
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
