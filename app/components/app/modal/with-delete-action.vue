<script setup lang="ts">
  interface Props {
    isPending: boolean
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-cancel': []
    'on-confirm': [id: string | number]
  }>()

  const onConfirm = (id: string | number) => {
    $emit('on-confirm', id)
  }

  const isActive = defineModel<boolean>()
</script>

<template>
  <AppModal
    v-model="isActive"
    max-width="300"
    title="Confirmar a exclusão?"
    @on-close="$emit('on-cancel')"
  >
    <v-card :loading="isPending">
      <v-card-text>Tem certeza que deseja excluir </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          min-width="140"
          variant="outlined"
          @click="$emit('on-cancel')"
          >Cancelar</v-btn
        >
        <v-btn
          color="error"
          :loading="isPending"
          min-width="140"
          variant="tonal"
          @click="onConfirm"
          >Excluir</v-btn
        >
      </v-card-actions>
    </v-card>
  </AppModal>
</template>
