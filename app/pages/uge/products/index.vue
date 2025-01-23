<script setup lang="ts">
  const products = ref([
    {
      id: 1,
      name: 'Produto 1',
    },
    {
      id: 2,
      name: 'Produto 2',
    },
    {
      id: 3,
      name: 'Produto 3',
    },
    {
      id: 4,
      name: 'Produto 4',
    },
    {
      id: 5,
      name: 'Produto 5',
    },
    {
      id: 6,
      name: 'Produto 6',
    },
  ])
</script>

<template>
  <div>
    <div>Produtos</div>
    <v-list>
      <v-list-item
        v-for="product in products"
        :key="product.id"
        ><NuxtLink
          :to="{ name: 'uge-products-id', params: { id: product.id } }"
        >
          {{ `${product.id} - ${product.name}` }}
        </NuxtLink>
      </v-list-item>
    </v-list>
  </div>
</template>
