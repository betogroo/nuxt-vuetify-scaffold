<script setup lang="ts">
  interface Props {
    id: number
  }
  const props = defineProps<Props>()

  const { productOnDemand, getProductsOnDemand } = useProduct()

  onMounted(async () => {
    await getProductsOnDemand({ purchasing_demand_id: props.id })
  })
</script>

<template>
  <div v-if="productOnDemand?.length">{{ productOnDemand }}</div>
</template>
