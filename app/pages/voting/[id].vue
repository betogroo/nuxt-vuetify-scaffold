<script setup lang="ts">
  const { id } = useValidateParam()

  const { election, getElectionById } = useElection()

  onMounted(async () => {
    if (id) await getElectionById(id)
  })
</script>

<template>
  <v-container>
    <AppCard
      v-if="election"
      :title="election?.name"
    >
      Nesta página teremos a tabela com os candidatos, urnas, e ações da eleição
    </AppCard>
  </v-container>
</template>
