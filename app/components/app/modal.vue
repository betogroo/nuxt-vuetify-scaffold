<script setup lang="ts" generic="T">
  interface Props {
    title?: string
  }
  defineProps<Props>()

  const isOpen = defineModel<boolean>()
</script>

<template>
  <v-dialog
    v-model="isOpen"
    max-width="640px"
  >
    <v-card class="pa-0 ma-0">
      <template #title>
        <div class="d-flex justify-space-between align-center pa-0 ma-0">
          <h1 class="text-h6">{{ title }}</h1>
          <v-btn
            color="black"
            :icon="iconOutline.close"
            size="x-small"
            variant="text"
            @click="isOpen = false"
          />
        </div>
      </template>
      <slot />
    </v-card>
  </v-dialog>
</template>
