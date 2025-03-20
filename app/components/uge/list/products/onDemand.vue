<script setup lang="ts">
  import type { TableColumn, OfferOnPurchasingDemandRow } from '~/types'

  interface Props {
    id: number
  }
  const props = defineProps<Props>()

  const $emit = defineEmits<{
    'offer-value-click': [id: string]
  }>()

  const { productsOnDemand, getProductsOnDemand } = useProduct()
  const { fetchOffersOnPurchasingDemand, offersOnPurchasingDemand } = useOffer()

  onMounted(async () => {
    try {
      await getProductsOnDemand(props.id)
      await fetchOffersOnPurchasingDemand({}, [
        `
    purchasing_demand_product:purchasing_demand_product_id,
    supplier_id,
    offer_value,
    ...suppliers!inner(
      supplier_name:name
    )
    `,
      ])
      console.log(offersOnPurchasingDemand)
    } catch (error) {
      console.log(error)
    }
  })

  const offersOnDemandHeaders: TableColumn[] = [
    {
      key: 'supplier_name',
      title: 'Fornecedor',
    },
    {
      key: 'offer_value',
      title: 'Valor ofertado',
    },
  ]

  const productsOnDemandHeaders: TableColumn[] = [
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
      key: 'actions',
    },
  ]

  const expandedRowItem = ref<OfferOnPurchasingDemandRow[] | null>([])

  const expandRow = async (id: string) => {
    console.log(id)
    const filteredOffers = offersOnPurchasingDemand.value.filter(
      (item) => item.purchasing_demand_product === id,
    )
    console.log(filteredOffers)
    expandedRowItem.value = filteredOffers || null
  }
</script>

<template>
  <v-data-table
    :headers="productsOnDemandHeaders"
    :items="productsOnDemand"
    show-expand
  >
    <template #item.price="{ value }">
      {{ formatCurrency(value, 4) }}
    </template>
    <template #item.total_price="{ value }">
      {{ formatCurrency(value) }}
    </template>

    <template #item.actions="{ item }">
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
          <v-data-table
            v-if="expandedRowItem"
            density="compact"
            disable-sort
            :headers="offersOnDemandHeaders"
            hide-default-footer
            :items="expandedRowItem"
          />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
