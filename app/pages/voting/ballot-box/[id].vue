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
  <v-container>
    <div v-if="!isBallotBoxPending.isLoading">{{ ballotBox }}</div>
    <div v-else>Loading</div>
  </v-container>
</template>
