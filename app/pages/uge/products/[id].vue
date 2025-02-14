<script setup lang="ts">
  import type { ProductUnitInsert } from '~/types'
  const id = useValidateParam().id

  const {
    product,
    units,
    unitsPending,
    getProduct,
    getUnits,
    productPending,
    getAvailableUnits,
    availableUnits,
    addUnitToProduct,
    addUnitToProductPending,
  } = useProduct()
  onMounted(async () => {
    if (id) {
      await getProduct(id)
      await getUnits(id)
      await getAvailableUnits(id)
    }
  })

  const addUnit = async (values: ProductUnitInsert) => {
    try {
      await addUnitToProduct(values)
      await getUnits(id!)
      await getAvailableUnits(id!)
    } catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <v-container>
    <div v-if="!productPending.isLoading && !unitsPending.isLoading && product">
      <h1>{{ product?.name }}({{ product.cat_mat }})</h1>
      <h2>Cadastrado em {{ timestampToDate(product.created_at) }}</h2>

      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          cols="12"
          md="4"
          sm="6"
        >
          <UgeCard title="Classe de Materiais">{{
            product.product_class_id
          }}</UgeCard>
        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="6"
        >
          <UgeCard title="Natureza da Despesa BEC">
            {{ product.expense_category_id }}
          </UgeCard>
        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="6"
        >
          <UgeCard title="Item BEC">
            <NuxtLink
              class="text-decoration-none"
              role="button"
              target="_blank"
              :to="`https://www.bec.sp.gov.br/BEC_Catalogo_ui/CatalogDetalheNovo.aspx?chave=&cod_id=${product.bec_number}`"
            >
              {{ product.bec_number.toString() }}
            </NuxtLink>
          </UgeCard>
        </v-col>
      </v-row>

      <UgeCard title="Unidades de Fornecimento">
        <TablePackagingUnit :rows="units" />

        <FormProductUnit
          :is-pending="addUnitToProductPending.isLoading"
          :product-id="id!"
          :units="availableUnits"
          @on-submit="(values) => addUnit(values)"
        />
      </UgeCard>
    </div>
    <div v-else>Carregando</div>
  </v-container>
</template>
