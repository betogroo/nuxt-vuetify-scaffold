<script setup lang="ts">
  import type { ProfileUpdate } from '~/types'

  const { user } = useUserStatus()
  const { handleError } = useHelpers()
  const {
    profile,
    getProfile,
    updateProfile,
    updateEmailPending,
    updateProfilePending,
  } = useProfile()
  const error = ref('')
  const editMode = ref(true)

  const toggleEditMode = () => {
    editMode.value = !editMode.value
  }

  const handleUpdate = async (data: ProfileUpdate) => {
    await updateProfile(data)
  }

  try {
    await getProfile()
  } catch (err) {
    error.value = handleError(err).message
    console.log(error.value)
  }
</script>

<template>
  <div v-if="!profile || !user">
    <ErrorDataInvalid :message="error" />
  </div>
  <v-container
    v-else
    max-width="320"
  >
    <v-row no-gutters>
      <v-col
        class="d-flex justify-center mt-4"
        cols="12"
      >
        <v-avatar
          class="pa-0"
          :ripple="false"
          size="320"
        >
          <v-img src="https://avatars.githubusercontent.com/u/739984?v=4" />
        </v-avatar>
      </v-col>
    </v-row>
    <div v-if="!editMode">
      <v-row dense>
        <v-col class="d-flex justify-center">
          <h1 class="text-h4">
            {{ profile.name ? profile.name : 'Inserir Nome' }}
          </h1>
        </v-col>
        <v-col
          class="d-flex justify-center"
          cols="12"
        >
          <h4 class="text-h6">{{ profile.username }}</h4></v-col
        >
        <v-col
          class="d-flex justify-center"
          cols="12"
        >
          <h4 class="text-h6">{{ profile.email }}</h4></v-col
        >
        <v-col class="d-flex justify-center"
          ><v-btn
            variant="tonal"
            @click="editMode = !editMode"
            >Editar Perfil</v-btn
          ></v-col
        >
      </v-row>
    </div>
    <div v-else>
      <v-row no-gutters>
        <v-col cols="12">
          <FormProfile
            :initial-values="profile"
            :is-pending="
              updateEmailPending.isLoading || updateProfilePending.isLoading
            "
            @on-cancel="toggleEditMode"
            @on-submit="handleUpdate"
          />
        </v-col>
      </v-row>
    </div>
    <v-row dense />
  </v-container>
</template>
