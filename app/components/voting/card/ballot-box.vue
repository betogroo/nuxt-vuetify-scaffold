<script setup lang="ts">
  import type { BallotBoxRow } from '~/types'

  interface Props {
    ballotBox: BallotBoxRow
  }
  defineProps<Props>()
</script>

<template>
  <v-card
    :key="ballotBox.id"
    class="ma-1 d-flex flex-column"
    :subtitle="ballotBox.site || ''"
    :title="ballotBox.name"
    variant="outlined"
    width="240"
  >
    <template #title>
      <v-row
        align="center"
        class="text-subtitle-1"
        no-gutters
      >
        <v-col>{{ ballotBox.name }}</v-col>
        <v-col
          class="text-right"
          cols="3"
        >
          <slot name="dropdown-menu" />
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
