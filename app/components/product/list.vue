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
  <div
    v-if="productsOnDemand?.length"
    class="d-flex justify-space-around flex-wrap"
  >
    <v-card
      v-for="product in productsOnDemand"
      :key="product.id"
      class="ma-2"
      color="primary"
      height="135"
      variant="tonal"
      width="240"
    >
      <template #title
        ><span class="text-body-2">{{
          `Item ${product.item_number} - 
          ${product.name}`
        }}</span></template
      >
      <v-row
        class="text-caption"
        no-gutters
      >
        <v-col cols="6"> Quantidade {{ product.quantity }}</v-col>
        <v-col>Valor Unitário {{ product.price }}</v-col>
        <v-col cols="12">Valor Total {{ product.total_price }}</v-col>
      </v-row>
    </v-card>
  </div>
</template>
