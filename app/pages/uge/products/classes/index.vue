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
      density="compact"
      item-title="name"
      item-value="id"
      :items="productClasses"
      nav
      @click:select="(item: any) => goTo(item.id)"
    >
      <template #prepend="{ item }">({{ item.id }})</template>
    </v-list>
  </v-container>
</template>
