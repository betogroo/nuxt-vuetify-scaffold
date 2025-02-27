<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { PackagingUnitUpdate } from '~/types'
  import { validatePackagingUnitUpdate } from '~/validate'

  interface Props {
    isPending?: boolean
    initialValues: PackagingUnitUpdate
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      values: PackagingUnitUpdate,
      onSuccess: () => void,
      onError: (message: string) => void,
    ]
  }>()

  const { onHandleError, onHandleSuccess } = useHandleForm()

  const { handleSubmit, handleReset, values, meta } =
    useForm<PackagingUnitUpdate>({
      validationSchema: validatePackagingUnitUpdate,
      initialValues: {
        name: props.initialValues.name,
        name_bec: props.initialValues.name_bec,
      },
    })

  const editMode = ref(false)

  const { value: name, errorMessage: nameError } =
    useField<PackagingUnitUpdate['name']>('name')

  const { value: nameBec, errorMessage: nameBecError } =
    useField<PackagingUnitUpdate['name_bec']>('name_bec')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const toggleEdit = () => {
    editMode.value = !editMode.value
    handleReset()
  }

  const onSuccess = () => {
    editMode.value = false
    onHandleSuccess(`Editado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    handleReset()
    onHandleError(message)
  }
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row
      align="center"
      no-gutters
    >
      <v-col cols="12">
        <v-text-field
          v-model="name"
          :disabled="isPending"
          :error-messages="nameError"
          :readonly="!editMode"
          :variant="editMode ? 'outlined' : 'plain'"
        />
        <v-text-field
          v-model="nameBec"
          :disabled="isPending"
          :error-messages="nameBecError"
          :readonly="!editMode"
          :variant="editMode ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        ><v-btn @click="toggleEdit">Editar</v-btn>
        <v-btn
          color="success"
          :disabled="!meta.valid || !editMode"
          @click="onSubmit"
          >Salvar</v-btn
        ></v-col
      >
      {{ initialValues }}
    </v-row>
  </v-form>
</template>
