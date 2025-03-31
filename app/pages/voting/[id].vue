<script setup lang="ts">
  const { id } = useValidateParam()
</script>

<template>
  <v-container>
    <AppCard :title="`Eleição número ${id}`">
      Nesta página teremos a tabela com os candidatos, urnas, e ações da eleição
    </AppCard>
  </v-container>
</template>
