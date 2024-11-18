<script setup lang="ts">
  import type { DocumentDemandInsert, TableColumn } from '~/types'
  const { handleError, showToast } = useHelpers()
  const {
    fetchDocumentDemands,
    documentDemandPending,
    addDocumentDemand,
    tableDemandView,
  } = useDocumentDemand()
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
  const submitDocumentDemand = async (documentDemand: DocumentDemandInsert) => {
    try {
      const newDocumentDemand = await addDocumentDemand(documentDemand)
      if (!newDocumentDemand) throw new Error('aqui deu erro')
      showToast(
        'success',
        `Documento ${newDocumentDemand?.document_number} cadastrado com sucesso`,
      )
      closeModal()
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      showToast('error', error.message)
      console.error(error)
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
      <AppModal
        v-model="newRgModal"
        title="Cadastrar Documento"
      >
        <FormDocumentDemand
          :is-pending="
            documentDemandPending.isLoading &&
            documentDemandPending.action === 'add-document_demand'
          "
          @on-submit="submitDocumentDemand"
        />
      </AppModal>
      <v-btn
        :icon="iconOutline.plus"
        @click="openModal"
      />
      <TableDocumentDemand
        :columns="columns"
        :rows="tableDemandView"
        title="Documentos Cadastrados"
      /></section
  ></v-container>
</template>
