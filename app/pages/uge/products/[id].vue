<script setup lang="ts">
  const id = useValidateParam().id

  const { product, units, unitsPending, getProduct, getUnits, productPending } =
    useProduct()
  onMounted(async () => {
    await getProduct(id!)
    await getUnits(id!)
  })
</script>

<template>
  <div v-if="!productPending.isLoading && !unitsPending.isLoading">
    <div>Produto {{ id }}</div>
    <div>{{ product }}</div>
    <div>{{ units }}</div>
  </div>
  <div v-else>Carregando</div>
</template>
