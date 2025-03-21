<script setup lang="ts" generic="T">
  interface Props {
    title?: string
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    'on-close': []
  }>()

  const onClose = () => {
    isActive.value = false
    $emit('on-close')
  }

  const isActive = defineModel<boolean>()
</script>

<template>
  <v-dialog
    v-model="isActive"
    max-width="640px"
    @update:model-value="
      (value) => {
        if (!value) $emit('on-close')
      }
    "
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
            @click="onClose()"
          />
        </div>
      </template>
      <slot />
    </v-card>
  </v-dialog>
</template>
