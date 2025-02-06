<script setup lang="ts">
  import type { ProductInsert, ProductRow } from '~/types'

  const { push } = useRouter()

  const {
    products,
    fetchProducts,
    fetchPendingProducts,
    tableColumns: productTableColumns,
    insertProduct,
    insertProductPending,
    productClasses,
    fetchProductClasses,
  } = useProduct()

  const submitProduct = async (
    data: ProductInsert,
    onSuccess: (id: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: ProductRow = await insertProduct(data)
      if (!insertedData) throw Error('Erro ao tentar inserir o produto')
      onSuccess(insertedData.id)
      push(`/uge/products/${insertedData.id}`)
    } catch (error) {
      onError('Erro ao tentar inserir o produto', error)
    }
  }

  onMounted(async () => {
    await fetchProducts()
    await fetchProductClasses()
  })
</script>

<template>
  <div>
    <TableProducts
      :columns="productTableColumns"
      :is-pending="fetchPendingProducts.isLoading"
      :rows="products"
      title="Produtos Cadastrados"
    />
    <FormProduct
      :is-pending="insertProductPending.isLoading"
      :product-classes-select-items="productClasses"
      @on-submit="
        (values, onSuccess, onError) =>
          submitProduct(values, onSuccess, onError)
      "
    />
    {{ productClasses }}
  </div>
</template>
