<script setup lang="ts">
  const { user } = useUserStatus()
  const { handleError } = useHelpers()
  const { profile, getProfile } = useProfile()
  const error = ref('')
  const editMode = ref(false)

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
  <div v-else>
    <div v-if="!editMode">
      <v-row no-gutters>
        <v-col
          class="d-flex justify-center mt-4"
          cols="12"
        >
          <v-avatar
            class="pa-0"
            :ripple="false"
            size="200"
          >
            <v-img src="https://avatars.githubusercontent.com/u/739984?v=4" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          class="d-flex justify-center"
          cols="12"
        >
          <h1 class="text-h4">
            {{ profile.name ? profile.name : 'Inserir Nome' }}
          </h1>
        </v-col>
        <v-col
          class="d-flex justify-center"
          cols="12"
        >
          <h4 class="text-h6">{{ profile.email }}</h4></v-col
        >
      </v-row>
    </div>
    <div v-else>
      <v-row no-gutters>
        <v-col
          class="d-flex justify-center mt-4"
          cols="12"
          >Formulário</v-col
        >
      </v-row>
    </div>
    <v-row dense>
      <v-col class="d-flex justify-center"
        ><v-btn @click="editMode = !editMode">Editar Perfil</v-btn></v-col
      >
    </v-row>
  </div>
</template>
