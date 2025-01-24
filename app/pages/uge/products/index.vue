<script setup lang="ts">
  const { products, fetchProducts, fetchPendingProducts } = useProduct()

  onMounted(async () => {
    await fetchProducts()
  })
</script>

<template>
  <div>
    <div>Produtos</div>
    <v-list>
      <v-list-item
        v-for="product in products"
        :key="product.id"
        nav
        :to="{ name: 'uge-products-id', params: { id: product.id } }"
      >
        {{ `${product}` }}
      </v-list-item>
    </v-list>
  </div>
</template>
