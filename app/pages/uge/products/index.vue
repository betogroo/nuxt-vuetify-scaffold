<script setup lang="ts">
  const {
    products,
    fetchProducts,
    fetchPendingProducts,
    tableColumns: productTableColumns,
  } = useProduct()

  onMounted(async () => {
    await fetchProducts()
  })
</script>

<template>
  <div>
    <TableProducts
      :columns="productTableColumns"
      :is-pending="fetchPendingProducts.isLoading"
      :rows="products"
      title="Produtos Cadastrados"
    />
  </div>
</template>
