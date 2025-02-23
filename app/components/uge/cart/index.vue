<script setup lang="ts">
  import type {
    ProductName,
    ProductRow,
    PurchasingDemandProductInsert,
  } from '~/types'

  interface Props {
    demandId: number
  }
  const props = defineProps<Props>()

  const {
    getProductsByName,
    productsByName,
    insertProductsOnDemand: _insertProductsOnDemand,
  } = useProduct()

  const cartIsActive = defineModel<boolean>()
  const products = ref<ProductRow[]>([])
  const quantities = reactive<Record<string, number>>({})
  const prices = reactive<Record<string, number>>({})

  const handleSearchForm = async (data: ProductName) => {
    await getProductsByName({ name: data.name }, ['name'])
    console.log(productsByName)
  }

  const resetProductSearched = () => {
    productsByName.value = []
  }

  const addProduct = (product: ProductRow) => {
    const productExists = products.value.some((item) => item.id === product.id)
    if (productExists) {
      alert('Produto já está no carrinho - TROCAR POR ERRO EM BAIXO')
    } else {
      products.value = [...products.value, product]
    }
    if (productsByName.value?.length)
      productsByName.value = productsByName.value.filter(
        (item) => item.id !== product.id,
      )
  }

  const insertProductsOnDemand = async () => {
    let finalProducts: PurchasingDemandProductInsert[] = products.value.map(
      (item) => {
        return {
          purchasing_demand_id: props.demandId,
          products_id: item.id,
          quantity: quantities[item.id]!,
          price: prices[item.id]!,
        }
      },
    )
    await _insertProductsOnDemand(finalProducts)
    finalProducts = []
    products.value = []
    console.log(finalProducts)
  }

  onMounted(() => {
    products.value.forEach((product) => {
      quantities[product.id] = 1 // Default inicial
    })
  })
</script>

<template>
  <AppDrawer v-model="cartIsActive">
    <v-container>
      <AppCard title="Busque o Produto Desejado">
        <UgeFormProductSearch
          @on-reset="resetProductSearched"
          @on-submit="(values) => handleSearchForm(values)"
        />
        <v-list v-if="productsByName?.length">
          <v-list-item
            v-for="product in productsByName"
            :key="product.cat_mat"
            slim
            :title="product.name"
          >
            <template #append>
              <v-btn
                color="success"
                :icon="iconOutline.plus"
                variant="text"
                @click="addProduct(product)"
            /></template>
          </v-list-item>
        </v-list>
      </AppCard>

      <AppCard title="Produtos Selecionados">
        <v-list v-if="products.length">
          <v-row>
            <v-list-item
              v-for="product in products"
              :key="product.id"
            >
              <div class="d-flex align-center">
                <v-col>{{ product.name }}</v-col>
                <v-col>
                  <v-text-field
                    v-model.number="quantities[product.id]"
                    density="compact"
                    hide-details
                    type="number"
                    variant="outlined"
                /></v-col>
                <v-col>
                  <v-text-field
                    v-model.number="prices[product.id]"
                    density="compact"
                    hide-details
                    type="number"
                    variant="outlined"
                  />
                </v-col>
              </div> </v-list-item
          ></v-row>

          <v-btn @click="insertProductsOnDemand">Adicionar ao Processo</v-btn>
        </v-list>
      </AppCard>
      Carrinho
    </v-container>
  </AppDrawer>
</template>
