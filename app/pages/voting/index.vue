<script setup lang="ts">
  import type { Election } from '~/types/voting'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Votação',
    order: 4,
  })

  const elections: Election[] = [
    {
      id: 1,
      name: 'Eleição de Síndico',
      date: '01/01/2025',
    },
    {
      id: 2,
      name: 'Eleição de Grêmio',
      date: '01/01/2025',
    },
    {
      id: 3,
      name: 'Eleição de Peças Bonitas',
      date: '01/01/2025',
    },
    {
      id: 4,
      name: 'Eleição de Qualquer Coisa',
      date: '01/01/2025',
    },
  ]
</script>

<template>
  <v-container>
    <AppCard title="Sistema de Votação">
      Nesta página teremos uma tabela com as votações em curso. Cada uma terá o
      link para ir aos detalhes para a votação correspondente.
      {{ elections }}
      <VotingTableElection :items="elections" />
    </AppCard>
  </v-container>
</template>
