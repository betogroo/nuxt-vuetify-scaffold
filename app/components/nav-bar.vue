<script setup lang="ts">
  const { user } = useUserStatus()
  const { handleLogout } = useAuth()
  const { navBarItems } = useNavigation()

  const items = [
    {
      label: 'Settings',
      icon: iconOutline.settings,
      click: () => {
        return navigateTo('/settings')
      },
    },
    {
      label: 'Sign out',
      icon: iconOutline.signOut,
      click: async () => {
        await handleLogout()
        return navigateTo('/login')
      },
    },
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
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            flat
            :ripple="false"
            size="small"
            slim
            variant="plain"
            v-bind="props"
          >
            <v-avatar
              class="pa-0"
              :ripple="false"
              size="x-small"
            >
              <v-img src="https://avatars.githubusercontent.com/u/739984?v=4" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list
          density="compact"
          :lines="false"
          nav
          ><v-list-item
            density="compact"
            prepend-avatar="https://avatars.githubusercontent.com/u/739984?v=4"
            @click="
              () => {
                console.log('Vai para o profile')
              }
            "
          >
            {{ user?.email }}</v-list-item
          >
          <v-divider class="mb-2" />
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            color="primary"
            nav
            :value="item"
            @click="item.click"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
