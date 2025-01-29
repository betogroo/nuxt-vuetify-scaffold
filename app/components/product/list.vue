<script setup lang="ts">
  interface Props {
    id: number
  }
  const props = defineProps<Props>()

  const { productsOnDemand, getProductsOnDemand } = useProductOnDemand()

  onMounted(async () => {
    try {
      await getProductsOnDemand(props.id)
    } catch (error) {
      console.log(error)
    }
  })
</script>

<template>
  <div v-if="productsOnDemand?.length">{{ productsOnDemand }}</div>
</template>
