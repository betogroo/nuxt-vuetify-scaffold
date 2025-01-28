<script setup lang="ts">
  import type { ProductName, ProductRow, SupportTeam } from '~/types'
  const { id } = useValidateParam()
  const { areObjectsEqual } = useHelpers()
  const {
    isActive: insertMemberModal,
    openModal,
    closeModal,
    props,
  } = useModal()

  const { isActive: cartIsActive, open: openCart } = useDrawer()

  const { demand, getPurchasingDemand, purchasingDemandDetailsPending } =
    usePurchasingDemand()

  const {
    availableSupportTeamMember,
    insertMemberPending,
    insertMember,
    getAvailableSupportTeam,
    deleteMember: _deleteMember,
    deletePending: deleteMemberPending,
  } = useMemberTeam()

  const openSupportMemberModal = async () => {
    if (availableMemberToInsert.value) return
    if (!availableSupportTeamMember.value.length) return
    openModal({
      title: 'Inserir membro em equipe de apoio',
      mode: 'insert-member-modal',
    })
  }

  const { getProductsByName, productsByName } = useProduct()

  const openProductsDrawer = () => {
    openCart()
  }

  const handleSearchForm = async (data: ProductName) => {
    await getProductsByName({ name: data.name }, ['name'])
    console.log(productsByName)
  }

  const products = ref<ProductRow[]>([])
  const quantities = reactive<Record<string, number>>({})

  const addProduct = (product: ProductRow) => {
    products.value = [...products.value, product]
  }

  const insertProductsOnDemand = async () => {
    const finalProducts = products.value.map((item) => {
      return {
        id: item.id,
        quantities: quantities[item.id],
      }
    })
    console.log(finalProducts)
  }

  const updateData = async (id: number | string) => {
    if (!id) return
    await getPurchasingDemand(+id)
    await getAvailableSupportTeam(+id)
  }

  const submitSupportMemberForm = async (
    data: SupportTeam,
    onSuccess: (message: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData = await insertMember(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      await updateData(id!)
      onSuccess('Membro adicionado à demanda com sucesso')
      closeModal()
    } catch (error) {
      console.log(error)
      onError(`Erro ao tentar inserir a demanda`, error)
    }
  }

  const availableMemberToInsert = computed(
    () => !availableSupportTeamMember.value.length,
  )

  const deleteMember = async (process_id: number, profile_id: string) => {
    try {
      const deletedData = await _deleteMember({ process_id, profile_id })
      await updateData(id!)
      console.log(deletedData)
    } catch (error) {
      console.error(error)
    }
  }

  // const insertProductsDrawer = ref(false)

  onMounted(async () => {
    await updateData(id!)
    products.value.forEach((product) => {
      quantities[product.id] = 1 // Default inicial
    })
  })
</script>

<template>
  <div>
    <AppCard
      v-if="demand"
      :loading="purchasingDemandDetailsPending.isLoading"
      :subtitle="`PTRES ${demand.ptres_number}`"
      :title="`Processo ${demand.id} - (${demand.description})`"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <UgeCard title="Agente de Contratação">
            <LinkProfileChip
              :id="demand.contracting_agent_id"
              :name="demand.contracting_agent_name || ''"
              :to="{
                name: 'uge-profile-id',
                params: { id: demand.contracting_agent_id },
              }"
            />
          </UgeCard>
        </v-col>
        <v-col>
          <UgeCard title="Equipe de Apoio">
            <LinkProfileChip
              v-for="member in demand.support_team"
              :key="member.id"
              deletable
              :is-pending="
                  deleteMemberPending.isLoading 
                  &&
                  areObjectsEqual(deleteMemberPending.pendingItem as SupportTeam, {process_id: demand.id, profile_id: member.id})
                "
              :name="member.name || ''"
              :to="{ name: 'uge-profile-id', params: { id: member.id } }"
              @on-delete="deleteMember(demand.id, member.id)"
            />
            <template #action>
              <v-btn
                color="red"
                density="compact"
                :disabled="availableMemberToInsert"
                :icon="iconOutline.plus"
                variant="text"
                @click="openSupportMemberModal"
            /></template>
          </UgeCard>
        </v-col>
        <v-col cols="12">
          <UgeCard title="Produtos">
            <v-btn
              density="compact"
              :icon="iconOutline.plus"
              variant="text"
              @click="openProductsDrawer()"
            />
          </UgeCard>
        </v-col>
      </v-row>

      {{ demand }}
    </AppCard>
    <AppModal
      v-model="insertMemberModal"
      :title="props.title"
    >
      <FormSupportTeam
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
    <AppDrawer v-model="cartIsActive">
      <FormProductSearch @on-submit="(values) => handleSearchForm(values)" />
      <v-list v-if="productsByName?.length">
        <v-list-item
          v-for="product in productsByName"
          :key="product.cat_mat"
          @click="addProduct(product)"
        >
          {{ product.name }}</v-list-item
        >
      </v-list>
      <v-divider />
      <v-list v-if="products.length">
        <v-list-item
          v-for="product in products"
          :key="product.id"
        >
          <div class="d-flex align-center">
            <div>{{ product.name }}</div>
            <v-text-field
              v-model="quantities[product.id]"
              hide-details
              type="number"
              variant="outlined"
            />
          </div>
        </v-list-item>
        <v-btn @click="insertProductsOnDemand">Adicionar ao Processo</v-btn>
      </v-list>
    </AppDrawer>
  </div>
</template>
