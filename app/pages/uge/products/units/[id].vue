<script setup lang="ts">
  import type { PackagingUnitUpdate } from '~/types'

  const id = useValidateParam().id
  const {
    getPackagingUnitById,
    packagingUnit,
    updatePackagingUnit,
    updatePackagingUnitPending,
  } = usePackagingUnit()

  const handleUpdateProductClass = async (
    values: PackagingUnitUpdate,
    onSuccess: () => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      if (!id) throw Error('Número de item inválido')
      await updatePackagingUnit(id, values)
      await getPackagingUnitById(id)
      onSuccess()
    } catch (error) {
      onError('Erro ao tentar editar a unidade de medida', error)
    }
  }

  onMounted(async () => {
    try {
      if (id) await getPackagingUnitById(+id)
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <v-container>
    <UgeFormPackagingUnitUpdate
      v-if="packagingUnit"
      :key="`${packagingUnit.name}${packagingUnit.name_bec}`"
      :initial-values="packagingUnit"
      :is-pending="updatePackagingUnitPending.isLoading"
      @on-submit="
        (data, onSuccess, onError) =>
          handleUpdateProductClass(data, onSuccess, onError)
      "
    />
    <h1>Agora ver como deixar o form generico</h1>
  </v-container>
</template>
