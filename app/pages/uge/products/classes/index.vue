<script setup lang="ts">
  import type { ProductClassInsert } from '~/types'

  const { productClasses, fetchProductClasses } = useProductClasses()
  const { onHandleError } = useHandleForm()
  const { isActive, openModal, props } = useModal()

  const insertClass = (value: ProductClassInsert) => {
    console.log(value)
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
      <UgeFormProductClassInsert @on-submit="(value) => insertClass(value)" />
    </AppModal>
    <v-fab
      app
      class="mr-4"
      color="green"
      :icon="iconOutline.plus"
      location="right bottom"
      :style="{ zIndex: 1004 }"
      @click="openModal({ title: 'Nova Classe de Produtos' })"
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
