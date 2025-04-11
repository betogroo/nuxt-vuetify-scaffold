<script setup lang="ts">
  import type { BallotBoxRow, PendingState } from '~/types'
  const props = defineProps<Props>()

  const $emit = defineEmits<{
    'toggle-ready': [ballotBox: BallotBoxRow]
  }>()

  defineOptions({
    name: 'BallotBoxCard',
  })

  interface Props {
    ballotBox: BallotBoxRow
    readyPending: PendingState
  }

  const statusIcon = computed(() => {
    return props.ballotBox.ready ? icon.check : icon.stopCircle
  })
  const color = computed(() => {
    return props.ballotBox.ready ? 'green' : 'red'
  })
</script>

<template>
  <v-card
    class="ma-1 d-flex flex-column"
    :class="`text-${color}`"
    :style="`border-color: ${color}`"
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
          cols="4"
          ><v-btn
            :icon="statusIcon"
            :loading="
              readyPending.isLoading &&
              readyPending.pendingItem === ballotBox.id
            "
            :ripple="false"
            size="24"
            variant="text"
            @click="$emit('toggle-ready', ballotBox)"
          />
          <slot name="dropdown-menu" />
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
