<script setup lang="ts">
  import type { ProductClassInsert, ProductClassRow } from '~/types'

  const {
    productClasses,
    fetchProductClasses,
    insertProductClassPending,
    insertedProductClass,
  } = useProductClasses()
  const { onHandleError } = useHandleForm()
  const { isActive, openModal, props, closeModal } = useModal()

  const insertClass = async (
    value: ProductClassInsert,
    onSuccess: (name: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: ProductClassRow = await insertedProductClass(value)
      if (!insertedData) throw Error('Erro ao tentar inserir o classe')
      onSuccess(insertedData.name)
      await fetchProductClasses({ column: 'id' })
      closeModal()
    } catch (error) {
      onError('Erro ao tentar inserir a classe', error)
      console.log(error)
    }
  }

  onMounted(async () => {
    try {
      await fetchProductClasses({ column: 'id' })
    } catch (error) {
      onHandleError('Não foi possível carregar as classes', error)
      console.error(error)
    }
  })
</script>

<template>
  <v-container>
    <AppModal
      v-model="isActive"
      :title="props.title"
    >
      <UgeFormProductClassInsert
        :is-pending="insertProductClassPending.isLoading"
        @on-submit="
          (value, onSuccess, onError) => insertClass(value, onSuccess, onError)
        "
      />
    </AppModal>
    <AppFab
      :is-active="isActive"
      @handle-click="openModal({ title: 'Nova Classe de Produtos' })"
    />

    <h1>Classes de Produtos</h1>
    <v-list
      dense
      density="compact"
      lines="one"
      nav
    >
      <v-list-item
        v-for="item in productClasses"
        :key="item.id"
        density="compact"
        nav
        :to="`/uge/products/classes/${item.id}`"
      >
        <template #subtitle>{{ item.id }}</template>
        <template #title>{{ item.name }}</template>
      </v-list-item>
    </v-list>
  </v-container>
</template>
