<script setup lang="ts">
  import type { TableColumn } from '~/types'

  interface Props {
    id: number
  }
  const props = defineProps<Props>()

  const $emit = defineEmits<{
    'offer-value-click': [id: string]
  }>()

  const { productsOnDemand, getProductsOnDemand } = useProduct()
  const { fetchOfferOnPurchasingDemand, purchasingDemandOffers } = useOffer()

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

  const expandRow = async (id: string) => {
    console.log(id)
    await fetchOfferOnPurchasingDemand(id)
  }
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="productsOnDemand"
    show-expand
  >
    <template #item.price="{ value }">
      {{ formatCurrency(value, 4) }}
    </template>
    <template #item.total_price="{ value }">
      {{ formatCurrency(value) }}
    </template>

    <template #item.offer_value="{ item }">
      <div>
        <v-btn
          color="red"
          density="compact"
          :icon="iconOutline.plus"
          variant="text"
          @click="$emit('offer-value-click', item.id)"
        />
      </div>
    </template>
    <template #item.offer_total_value> offer total </template>
    <template
      #item.data-table-expand="{ isExpanded, toggleExpand, internalItem, item }"
    >
      <v-icon
        @click="toggleExpand(internalItem), $nextTick(() => expandRow(item.id))"
      >
        {{ isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
      </v-icon>
    </template>
    <template #expanded-row="{ columns }">
      <tr>
        <td
          class="py-2"
          :colspan="columns.length"
        >
          {{ purchasingDemandOffers }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
