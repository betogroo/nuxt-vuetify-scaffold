<script setup lang="ts">
  const id = useValidateParam().id

  const { product, getProduct } = useProduct()
  onBeforeMount(async () => {
    await getProduct(id!)
  })
</script>

<template>
  <div>Produto {{ id }}</div>
  <div>{{ product }}</div>
</template>
