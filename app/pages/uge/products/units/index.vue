<script setup lang="ts">
  const { fetchPackagingUnits, fetchPackagingUnitsPending, packagingUnits } =
    usePackagingUnit()

  const { isActive, props, openModal } = useModal()

  onMounted(async () => {
    try {
      await fetchPackagingUnits({ column: 'name' })
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <v-container
    ><h1>Units</h1>
    <AppModalWithFabActivator
      v-model="isActive"
      :title="props.title || ''"
      @open-modal="
        openModal({
          title: 'Nova Unidade de Medida',
        })
      "
    >
      Formulario
    </AppModalWithFabActivator>

    <v-list
      dense
      density="compact"
      lines="one"
      :loading="true"
      nav
    >
      <div v-if="fetchPackagingUnitsPending.isLoading">
        <v-skeleton-loader
          v-for="item in 6"
          :key="`skeleton${item}`"
          type="list-item-two-line"
        />
      </div>
      <v-list-item
        v-for="item in packagingUnits"
        v-else
        :key="item.id"
        density="compact"
        nav
        :to="`/uge/products/units/${item.id}`"
      >
        <template #subtitle>{{ item.name_bec }}</template>
        <template #title>{{ item.name }}</template>
      </v-list-item>
    </v-list>
  </v-container>
</template>
