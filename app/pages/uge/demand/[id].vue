<script setup lang="ts">
  import type { SupportTeam } from '~/types'
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

  const openProductsDrawer = () => {
    openCart()
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

  onMounted(async () => {
    await updateData(id!)
  })
</script>

<template>
  <v-container>
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
            <ProductList :id="+id!" />
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
    <ProductCart
      v-model="cartIsActive"
      :demand-id="+id!"
    />
  </v-container>
</template>
