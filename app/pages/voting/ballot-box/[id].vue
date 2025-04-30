<script setup lang="ts">
  defineOptions({
    name: 'BallotBox',
  })

  const { id } = useValidateParam()
  const { getBallotBoxById, isBallotBoxPending, ballotBox } = useBallotBox()

  onMounted(async () => {
    if (id) await getBallotBoxById(id)
  })
</script>

<template>
  <v-container v-if="ballotBox">
    <div v-if="!isBallotBoxPending.isLoading">
      <VotingBallotBox :ballot-box="ballotBox" />
    </div>
    <div v-else>Loading</div>
  </v-container>
  <div v-else>Criar componente para não encontrado</div>
</template>
