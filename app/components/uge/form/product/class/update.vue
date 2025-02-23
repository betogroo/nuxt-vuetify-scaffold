<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { ProductClassUpdate } from '~/types'
  import { validateProductClassUpdate } from '~/validate'

  interface Props {
    isPending?: boolean
    initialValues: ProductClassUpdate
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      values: ProductClassUpdate,
      onSuccess: () => void,
      onError: (message: string) => void,
    ]
  }>()

  const { onHandleError, onHandleSuccess } = useHandleForm()

  const { handleSubmit, handleReset, values, meta } =
    useForm<ProductClassUpdate>({
      validationSchema: validateProductClassUpdate,
      initialValues: props.initialValues,
    })

  const editMode = ref(false)

  const { value: name, errorMessage: nameError } =
    useField<ProductClassUpdate['name']>('name')
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
          density="compact"
          :disabled="isPending"
          :error-messages="nameError"
          :readonly="!editMode"
          :variant="editMode ? 'outlined' : 'plain'"
          @click:clear="toggleEdit"
        >
          <template #append-inner>
            <v-icon
              v-if="!editMode"
              color="error"
              @click="toggleEdit"
              >{{ iconOutline.edit }}</v-icon
            >
            <v-icon
              v-else
              @click="toggleEdit"
              >{{ iconOutline.close }}</v-icon
            >
          </template>
          <template #append>
            <v-btn
              v-if="editMode && meta.valid && meta.dirty"
              color="success"
              density="compact"
              :icon="iconOutline.checkCircle"
              :loading="isPending"
              type="submit"
              variant="plain"
            />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>
