<script setup lang="ts">
  const router = useRouter()
  const { productClasses, fetchProductClasses } = useProductClasses()

  const goTo = (id: number) => {
    if (id !== undefined && id !== null)
      router.push({ name: 'uge-products-classes-id', params: { id } })
    else console.warn('Código de Classe errado', id)
  }

  onMounted(async () => {
    try {
      await fetchProductClasses({ column: 'id' })
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <v-container>
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
