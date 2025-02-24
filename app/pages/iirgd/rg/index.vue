<script setup lang="ts">
  import type { DocumentDemandInsert, TableColumn } from '~/types'
  const {
    fetchDocumentDemands,
    documentDemandPending,
    insertDocumentDemand,
    tableDemandView,
  } = useDocumentDemand()
  const { handleError } = useHelpers()

  const {
    isActive,
    openModal: openInsertRgModal,
    closeModal: closeInsertRgModal,
    props,
  } = useModal()

  const newRgModal = ref(false)
  const openModal = () => {
    newRgModal.value = true
  }
  const closeModal = () => {
    newRgModal.value = false
  }

  onMounted(async () => {
    await fetchDocumentDemands()
  })
  const submitDocumentDemand = async (
    documentDemand: DocumentDemandInsert,
    onSuccess: (id: string | number) => void,
    onError: (message: string) => void,
  ) => {
    try {
      const newDocumentDemand = await insertDocumentDemand(documentDemand)
      if (!newDocumentDemand) throw new Error('Erro ao cadastrar demanda')
      onSuccess(newDocumentDemand.id)
      closeInsertRgModal()
      closeModal()
    } catch (error) {
      onError(`Erro ao tentar inserir a demanda, ${handleError(error).message}`)
    }
  }

  const columns: TableColumn[] = [
    {
      key: 'site',
      title: 'Posto',
    },
    {
      key: 'document_number',
      title: 'RG',
    },

    {
      key: 'name',
      title: 'Nome',
    },
    {
      key: 'type',
      title: 'Tipo',
    },
    {
      key: 'status',
      title: 'Situação',
    },

    {
      key: 'actions',
    },
  ]
</script>

<template>
  <v-container>
    <section>
      <h1 class="mb-4">RGs</h1>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard title="Novos">1</AppCard>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard title="Consultados">2</AppCard>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard title="Liberados">3</AppCard>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard title="Emitidos">4</AppCard>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard title="Erro">5</AppCard>
        </v-col>
      </v-row>
    </section>
    <section>
      <AppModalWithFabActivator
        v-model="isActive"
        :title="props.title!"
        @open-modal="openInsertRgModal({ title: 'Novo Documento' })"
      >
        <FormDocumentDemand
          :is-pending="
            documentDemandPending.isLoading &&
            documentDemandPending.action === 'add-document_demand'
          "
          @on-submit="
            (values, onSuccess, onError) =>
              submitDocumentDemand(values, onSuccess, onError)
          "
        />
      </AppModalWithFabActivator>
      <IirgdTableDocumentDemand
        :columns="columns"
        :rows="tableDemandView"
        title="Documentos Cadastrados"
      /></section
  ></v-container>
</template>
