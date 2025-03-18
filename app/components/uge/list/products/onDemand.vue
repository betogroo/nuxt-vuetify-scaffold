<script setup lang="ts">
  import type { TableColumn } from '~/types'

  interface Props {
    id: number
  }
  const props = defineProps<Props>()

  const { productsOnDemand, getProductsOnDemand } = useProduct()

  onMounted(async () => {
    try {
      await getProductsOnDemand(props.id)
    } catch (error) {
      console.log(error)
    }
  })

  const headers: TableColumn[] = [
    {
      key: 'item_number',
      title: '#',
    },
    {
      key: 'name',
      title: 'Produto',
    },
    {
      key: 'quantity',
      title: 'quantidade',
    },
    {
      key: 'price',
      title: 'Valor Referência',
    },
    {
      key: 'total_price',
      title: 'Valor Total',
    },
    {
      key: 'offer_value',
      title: 'Valor Ofertado',
    },
    {
      key: 'offer_total_value',
      title: 'Valor Total Ofertado',
    },
  ]
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="productsOnDemand"
  >
    <template #item.price="{ value }">
      {{ formatCurrency(value, 4) }}
    </template>
    <template #item.total_price="{ value }">
      {{ formatCurrency(value) }}
    </template>

    <template #item.offer_value="{ item }">
      <div v-if="item.offer_value">
        {{ formatCurrency(item.offer_value, 4) }}
      </div>
      <div v-else>
        <v-btn
          color="red"
          density="compact"
          :icon="iconOutline.plus"
          variant="text"
        />
      </div>
    </template>
    <template #item.offer_total_value="{ item }">{{
      item.offer_value ? formatCurrency(item.quantity * item.offer_value) : ''
    }}</template>
  </v-data-table>
</template>
