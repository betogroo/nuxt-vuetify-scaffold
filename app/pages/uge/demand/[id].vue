<script setup lang="ts">
  import { offerInsertSchema } from '~/schemas'
  import type {
    DirtyPurchasingDemandUpdate,
    OfferInsert,
    OfferOnProductDemandRow,
    SupportTeam,
  } from '~/types'

  const { id } = useValidateParam()

  // details
  const isEditing = ref(false)

  //members
  const {
    isActive: insertMemberModal,
    openModal,
    closeModal,
    props,
  } = useModal()

  //cart
  const { isActive: cartIsActive, open: openCart } = useDrawer()

  //details
  const {
    purchasingDemand,
    getPurchasingDemandById,
    isPurchasingDemandPending,
    updatePurchasingDemand,
    isPurchasingDemandUpdating,
  } = usePurchasingDemand()

  //products
  const {
    productsOnDemand,
    getProductsOnDemand,
    productsOnDemandTableHeaders,
  } = useProduct()

  //offers
  const {
    fetchOffersOnProductDemand,
    offersOnProductDemand,
    offersOnDemandHeaders,
  } = useOffer()

  //member
  const {
    availableSupportTeamMember,
    insertMemberPending,
    insertMember,
    getAvailableSupportTeam,
    deleteMember: _deleteMember,
  } = useMemberTeam()

  //supplier
  const { suppliers, fetchSuppliers } = useSupplier()

  // cart
  const openProductsDrawer = () => {
    openCart()
  }

  // details
  const toggleEditMode = () => {
    isEditing.value = !isEditing.value
  }

  //details
  const handleUpdatePurchasingDemand = async (
    values: DirtyPurchasingDemandUpdate,
    onSuccess: () => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      if (!id) throw Error('Número de demanda inválido')
      await updatePurchasingDemand(id!, values)
      onSuccess()
      await getPurchasingDemandById(+id)
    } catch (error) {
      onError('Erro ao tentar editar a classe', error)
    }
  }

  const loadData = async (id: number | string) => {
    if (!id) return
    await getPurchasingDemandById(+id)
    await getAvailableSupportTeam(+id)
    await fetchOffersOnProductDemand({}, [
      `
    purchasing_demand_product:purchasing_demand_product_id,
    supplier_id,
    offer_value,
    ...suppliers!inner(
      supplier_name:name
    )
    `,
    ])
  }

  const submitSupportMemberForm = async (
    data: SupportTeam,
    onSuccess: (message: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData = await insertMember(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      await loadData(id!)
      onSuccess('Membro adicionado à demanda com sucesso')
      closeModal()
    } catch (error) {
      console.log(error)
      onError(`Erro ao tentar inserir a demanda`, error)
    }
  }

  onMounted(async () => {
    await loadData(id!)
    getProductsOnDemand(+id!)
  })

  const { insertOfferOnProductDemand, isOfferInserting } = useOffer()
  const productToInsert = ref<string>('')
  const handleInsertOfferProductDemand = async (
    values: OfferInsert,
    onSuccess: () => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const newValue: OfferInsert = offerInsertSchema.parse({
        ...values,
        purchasing_demand_product_id: productToInsert.value,
      })
      console.log(newValue)
      const insertedData: OfferInsert = await insertOfferOnProductDemand(
        newValue,
      )
      if (!insertedData) throw Error('Erro ao tentar inserir o produto')
      console.log('inserted', insertedData, productToInsert.value)
      onSuccess()
      closeModal()
    } catch (error) {
      onError('Erro ao tentar inserir o produto', error)
    }
  }

  const openInsertOfferFormModal = async (id: string) => {
    await fetchSuppliers()
    productToInsert.value = id
    openModal({ mode: 'insertOfferForm', title: 'Inserir Oferta' })
    console.log(suppliers)
    console.log(id)
  }

  const expandedRowItem = ref<OfferOnProductDemandRow[] | null>([])

  const expandRow = async (id: string) => {
    const filteredOffers: OfferOnProductDemandRow[] | null =
      offersOnProductDemand.value
        .filter((item) => item.purchasing_demand_product === id)
        .sort((a, b) => (a.offer_value ?? 0) - (b.offer_value ?? 0))
    expandedRowItem.value = filteredOffers || null
  }
</script>

<template>
  <v-container>
    <AppCard
      v-if="purchasingDemand"
      :loading="isPurchasingDemandPending.isLoading"
      :subtitle="`PTRES ${purchasingDemand.ptres_number}`"
      :title="`Detalhes do Processo ${purchasingDemand.id} - (${purchasingDemand.description})`"
    >
      <v-row>
        <v-col cols="12">
          <UgeCard title="Dados da Demanda">
            <UgeFormPurchaseDemandUpdate
              :key="purchasingDemand.updated_at"
              :initial-values="purchasingDemand"
              :is-editing="isEditing"
              :is-pending="isPurchasingDemandUpdating.isLoading"
              @edit="toggleEditMode"
              @submit="
                (data, onSuccess, onError) =>
                  handleUpdatePurchasingDemand(data, onSuccess, onError)
              "
            />
          </UgeCard>
        </v-col>

        <v-col cols="12">
          <UgeCard title="Produtos">
            <UgeTableProductsOnDemand
              :products-on-demand="productsOnDemand"
              :table-header="productsOnDemandTableHeaders"
              @add-offer="(id) => openInsertOfferFormModal(id)"
              @expand-row="(id) => expandRow(id)"
            >
              <template #offers-table>
                <uge-table-offers-on-product-demand
                  :offers="expandedRowItem"
                  :table-header="offersOnDemandHeaders"
                />
              </template>
            </UgeTableProductsOnDemand>

            <template #action>
              <v-btn
                density="compact"
                :icon="iconOutline.plus"
                variant="text"
                @click="openProductsDrawer()"
              />
            </template>
          </UgeCard>
        </v-col>
      </v-row>
    </AppCard>
    <AppModal
      v-model="insertMemberModal"
      :title="props.title"
    >
      <UgeFormProductOffer
        v-if="props.mode === 'insertOfferForm'"
        :is-pending="isOfferInserting.isLoading"
        :suppliers-select-items="suppliers"
        @submit="
          (values, onSuccess, onError) =>
            handleInsertOfferProductDemand(values, onSuccess, onError)
        "
      />
      <UgeFormSupportTeam
        v-if="props.mode === 'insert-member-modal'"
        :is-pending="insertMemberPending.isLoading"
        :member-option="availableSupportTeamMember"
        :purchasing-demand-id="+id!"
        @on-submit="
          (values, onSuccess, onError) =>
            submitSupportMemberForm(values, onSuccess, onError)
        "
      />
    </AppModal>
    <UgeCart
      v-model="cartIsActive"
      :demand-id="+id!"
    />
  </v-container>
</template>
