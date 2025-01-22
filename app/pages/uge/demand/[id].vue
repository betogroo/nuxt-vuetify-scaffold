<script setup lang="ts">
  import type { SupportTeam } from '~/types'
  const { id } = useValidateParam()
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

  const {
    isActive: insertMemberModal,
    openModal,
    closeModal,
    props,
  } = useModal()

  const openSupportMemberModal = async () => {
    await getAvailableSupportTeam(+id!)
    openModal({ title: 'Novo Membro', mode: 'insert-member-modal' })
  }

  const submitSupportMemberForm = async (
    data: SupportTeam,
    onSuccess: (message: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData = await insertMember(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      await getPurchasingDemand(+id!)
      onSuccess('Membro adicionado à demanda com sucesso')
      closeModal()
      //push(`/uge/demand/${insertedData.id}`)
    } catch (error) {
      console.log(error)
      onError(`Erro ao tentar inserir a demanda`, error)
    }
  }

  const deleteMember = async (process_id: number, profile_id: string) => {
    try {
      const deletedData = await _deleteMember({ process_id, profile_id })
      await getPurchasingDemand(+id!)
      console.log(deletedData)
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    await getPurchasingDemand(+id!)
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
            <div
              v-for="member in demand.support_team"
              :key="member.id"
            >
              <LinkProfileChip
                deletable
                :is-pending="
                  deleteMemberPending.isLoading &&
                  deleteMemberPending.itemId.profile_id === member.id
                "
                :name="member.name || ''"
                :to="{ name: 'uge-profile-id', params: { id: member.id } }"
                @on-delete="deleteMember(demand.id, member.id)"
              />
              {{ deleteMemberPending }}
            </div>
            <v-btn
              density="compact"
              :icon="iconOutline.plus"
              variant="text"
              @click="openSupportMemberModal"
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
  </div>
</template>
