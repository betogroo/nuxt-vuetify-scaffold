<script setup lang="ts">
  import type { DirtyPurchasingDemandUpdate, SupportTeam } from '~/types'

  const { id } = useValidateParam()
  const isEditing = ref(false)

  const {
    isActive: insertMemberModal,

    closeModal,
    props,
  } = useModal()

  const { isActive: cartIsActive, open: openCart } = useDrawer()

  const {
    purchasingDemand,
    getPurchasingDemandById,
    isPurchasingDemandPending,
    updatePurchasingDemand,
    isPurchasingDemandUpdating,
  } = usePurchasingDemand()

  const {
    availableSupportTeamMember,
    insertMemberPending,
    insertMember,
    getAvailableSupportTeam,
    deleteMember: _deleteMember,
  } = useMemberTeam()

  const openProductsDrawer = () => {
    openCart()
  }

  const toggleEditMode = () => {
    isEditing.value = !isEditing.value
  }

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
  })
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
            <UgeListProduct :id="+id!" />
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
