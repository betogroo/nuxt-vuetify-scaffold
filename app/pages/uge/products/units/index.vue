<script setup lang="ts">
  import type { PackagingUnitInsert } from '~/types'

  const { fetchPackagingUnits, fetchPackagingUnitsPending, packagingUnits } =
    usePackagingUnit()

  const { isActive, props, openModal } = useModal()

  const submitPackagingUnit = async (
    data: PackagingUnitInsert,
    onSuccess: (name: string) => void,
    onError: (message: string) => void,
  ) => {
    try {
      console.log(data)
      onSuccess('Deu certo')
    } catch (error) {
      onError(`Erro ao tentar inserir a unidade`)
      console.error(error)
    }
  }

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
      <UgeFormPackagingUnitInsert
        @on-submit="
          (data, onSuccess, onError) =>
            submitPackagingUnit(data, onSuccess, onError)
        "
      />
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
