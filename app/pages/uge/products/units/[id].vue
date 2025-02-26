<script setup lang="ts">
  const id = useValidateParam().id
  const { getPackagingUnitById, packagingUnit } = usePackagingUnit()

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
    <UgeFormProductClassUpdate
      v-if="packagingUnit"
      :key="packagingUnit.name"
      :initial-values="{ name: packagingUnit.name }"
    />
    <h1>Agora ver como deixar o form generico</h1>
  </v-container>
</template>
