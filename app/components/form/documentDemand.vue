<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { DocumentDemandInsert } from '~/types'
  import { validateDocumentDemand } from '~/validate'
  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      values: DocumentDemandInsert,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()

  const user = useSupabaseUser()

  const { isPending } = toRefs(props)
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } =
    useForm<DocumentDemandInsert>({
      validationSchema: validateDocumentDemand,
      initialValues: {
        user_id: user.value?.id,
      },
    })

  const { value: documentNumber, errorMessage: documentNumberError } =
    useField<DocumentDemandInsert['document_number']>('document_number')
  const { value: name, errorMessage: nameError } =
    useField<DocumentDemandInsert['name']>('name')
  const { value: site, errorMessage: siteError } =
    useField<DocumentDemandInsert['site']>('site')
  const { value: type, errorMessage: typeError } =
    useField<DocumentDemandInsert['type']>('type')
  const { value: note, errorMessage: noteError } =
    useField<DocumentDemandInsert['note']>('note')

  const onSuccess = (id: string | number) => {
    onHandleSuccess(`Documento ${id} cadastrado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values, onSuccess, onError)
    console.log(values)
  })
</script>

<template>
  <v-form
    class="pa-2 ma-2"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="documentNumber"
      density="compact"
      :error-messages="documentNumberError"
      label="Número do RG"
      variant="outlined"
    />
    <v-text-field
      v-model="name"
      density="compact"
      :error-messages="nameError"
      label="Nome (Como escrito no documento)"
      variant="outlined"
    />
    <generic-form-autocomplete
      v-model="type"
      :error-messages="typeError"
      :items="demandTypes"
      label="Escolha o tipo do documento"
      title-key="name"
      value-key="value"
    />
    <generic-form-autocomplete
      v-model="site"
      :error-messages="siteError"
      :items="demandSites"
      label="Escolha o posto de identificação"
      title-key="name"
      value-key="value"
    />
    <v-textarea
      v-model="note"
      :error-messages="noteError"
      label="Observações"
      variant="outlined"
    />

    <v-btn
      color="success"
      :disabled="!meta.valid"
      :loading="isPending"
      type="submit"
      >Enviar</v-btn
    >
    <v-btn
      color="red"
      @click="handleReset"
      >Limpar</v-btn
    >
  </v-form>
</template>
