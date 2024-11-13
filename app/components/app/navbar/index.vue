<script setup lang="ts">
  const { navbar } = useNavbar()
</script>

<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <template #append>
      <!-- app bar menu -->
      <slot
        :items="navbar.menu"
        name="menu"
      >
        <AppNavbarMenu :items="navbar.menu" />
      </slot>

      <slot
        :items="navbar.dropdown"
        name="user"
        :user="navbar.user"
      >
        <app-link
          v-if="!navbar.user"
          label="Login"
          to="/login"
        />
        <AppDropdown
          v-else
          :activator="{
            type: 'avatar',
            value: 'https://avatars.githubusercontent.com/u/739984?v=4',
          }"
          :email="navbar.user.email"
          :items="navbar.dropdown"
        />
      </slot>
    </template>
  </v-app-bar>
</template>
