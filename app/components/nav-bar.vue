<script setup lang="ts">
  const { user } = useUserStatus()
  const { handleLogout } = useAuth()
  const { navBarItems } = useNavigation()

  const items = [
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
      <template
        v-for="item in navBarItems"
        :key="item.path"
      >
        <v-btn
          class="pa-0 text-none"
          flat
          :ripple="false"
          selected-class="font-weight-bold"
          size="small"
          slim
          :text="item.meta.title || 'Sem Título'"
          :to="item.path"
          variant="plain"
        />

        <div class="mx-1">|</div>
      </template>
      <AppDropdown
        :email="user?.email"
        :items="items"
      />
    </template>
  </v-app-bar>
</template>
