<script setup lang="ts">
  const id = useValidateParam().id

  const { product, units, getProduct, getUnits } = useProduct()
  onBeforeMount(async () => {
    await getProduct(id!)
    await getUnits(id!)
  })
</script>

<template>
  <div>
    <div>Produto {{ id }}</div>
    <div>{{ product }}</div>
    <div>{{ units }}</div>
  </div>
</template>
