<script setup lang="ts">
  import type { DropdownItem } from '~/types'

  const { user } = useUserStatus()
  const { handleLogout } = useAuth()
  const { navbar } = useNavbar()

  const items: DropdownItem[][] = [
    [
      {
        label: user.value?.email,
        avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        action: () => {
          console.log('Vai para Profile')
        },
      },
    ],
    [
      {
        label: 'Settings',
        icon: iconOutline.settings,
        action: () => {
          return navigateTo('/settings')
        },
      },
      {
        label: 'Sign out',
        icon: iconOutline.signOut,
        action: async () => {
          await handleLogout()
          return navigateTo('/login')
        },
      },
    ],
  ]
</script>

<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <template #append>
      <!-- app bar menu -->
      <slot
        :items="navbar.items"
        name="menu"
      >
        <AppNavbarMenu :items="navbar.items" />
      </slot>

      <slot
        :items="items"
        name="user"
        :user="user"
      >
        <app-link
          v-if="!user"
          label="Login"
          to="/login"
        />
        <AppDropdown
          v-else
          :activator="{
            type: 'avatar',
            value: 'https://avatars.githubusercontent.com/u/739984?v=4',
          }"
          :email="user?.email"
          :items="items"
        />
      </slot>
    </template>
  </v-app-bar>
</template>
