<script setup lang="ts">
  import type { BallotBoxRow, DropdownItem } from '~/types'
  const { push } = useRouter()

  const { id } = useValidateParam()

  const { election, getElectionById, updateElection, isElectionUpdating } =
    useElection()

  const {
    ballotBoxes,
    getBallotBoxesByElectionId,
    insertBallotBox,
    isBallotBoxInserting,
    updateBallotBox,
    isBallotBoxUpdating,
  } = useBallotBox()

  const startElection = async () => {
    if (id) await updateElection(id, { status: 'started' })
  }
  const finishElection = async () => {
    if (id) await updateElection(id, { status: 'finished' })
  }
  const getReport = () => {
    console.log('Report', election)
  }

  const setBallotBoxReady = async (
    ballotBox: BallotBoxRow,
    value: string | null,
  ) => {
    if (!ballotBox) return
    if (!ballotBox.ready)
      await updateBallotBox(ballotBox.id, { ready: value }, ballotBox.id)
    else await updateBallotBox(ballotBox.id, { ready: null }, ballotBox.id)
  }

  const handleInsertBallotBox = async () => {
    const ballotBoxNumbers = ballotBoxes.value
      ?.map((item) => parseInt(item.name.replace('Urna', '')))
      .filter((item) => !isNaN(item))
    const maxNumber = ballotBoxNumbers?.length
      ? Math.max(...ballotBoxNumbers)
      : 0
    const nextNumber = maxNumber + 1
    await insertBallotBox({ name: `Urna ${nextNumber}`, election_id: id! })

    console.log(ballotBoxNumbers, maxNumber, nextNumber)
  }

  const {
    openModal: openConfirmDeleteModal,
    closeModal: closeConfirmDeleteModal,
    props: confirmDeleteProps,
    isActive: isConfirmDeleteModalActive,
  } = useModal()

  const confirmDeleteBallotBox = (id: string) => {
    console.log('vai excluir a urna', id)
    closeConfirmDeleteModal()
  }

  const disabledBallotBox = computed(() => {
    return election.value?.status !== 'started'
  })

  onMounted(async () => {
    await getElectionById(id!)
    await getBallotBoxesByElectionId({ election_id: id! }, [], {
      column: 'created_at',
    })
  })
  const dropdownItems = (item: BallotBoxRow): DropdownItem[][] => [
    [
      {
        label: 'Ir para a Urna',
        icon: iconOutline.expand,
        action: () => push(`ballot-box/${item.id}`),
      },
      {
        label: 'Editar Local',
        icon: iconOutline.edit,
        action: () => console.log('Edit', item.id),
      },
      {
        label: 'Delete',
        icon: iconOutline.trash,
        action: () => openConfirmDeleteModal({ id: item.id }),
        color: 'error',
      },
    ],
  ]
</script>

<template>
  <v-container>
    <AppModalWithDeleteAction
      v-model="isConfirmDeleteModalActive"
      @on-cancel="closeConfirmDeleteModal"
      @on-confirm="confirmDeleteBallotBox(confirmDeleteProps.id!.toString())"
    />
    <AppCard
      v-if="election"
      :loading="isElectionUpdating.isLoading"
      :subtitle="election.status"
      :title="election?.name"
    >
      <v-btn
        v-if="election.status === 'created'"
        color="primary"
        :loading="isBallotBoxInserting.isLoading"
        @click="handleInsertBallotBox"
        >Adicionar Urna</v-btn
      >
      <v-btn
        v-if="election.status === 'created' && ballotBoxes?.length"
        color="primary"
        :loading="isElectionUpdating.isLoading"
        @click="startElection"
        >Iniciar Eleição</v-btn
      >
      <v-btn
        v-if="election.status === 'started'"
        color="primary"
        :loading="isElectionUpdating.isLoading"
        @click="finishElection"
        >Finalizar Eleição</v-btn
      >
      <v-btn
        v-if="election.status === 'finished'"
        color="primary"
        @click="getReport"
        >Gerar Relatório</v-btn
      >
    </AppCard>
    <AppCard title="Urnas">
      <div class="d-flex flex-wrap justify-center">
        <VotingCardBallotBox
          v-for="item in ballotBoxes"
          :key="item.id"
          :ballot-box="item"
          :disabled="disabledBallotBox"
          :ready-pending="isBallotBoxUpdating"
          @toggle-ready="
            (item) => setBallotBoxReady(item, 'algo relacionado ao eleitor')
          "
        >
          <template #dropdown-menu
            ><AppDropdown
              :activator="{
                type: 'icon',
                value: iconOutline['dots-horizontal'],
              }"
              :items="dropdownItems(item)"
          /></template>
        </VotingCardBallotBox>
      </div>
      {{ isBallotBoxUpdating }}
    </AppCard>
  </v-container>
</template>
