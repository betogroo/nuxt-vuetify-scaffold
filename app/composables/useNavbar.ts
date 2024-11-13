import type { NavbarItem, DropdownItem } from '~/types'
import { navbarItemsSchema } from '~/schemas'

const useNavbar = () => {
  const router = useRouter()
  const routes = router.getRoutes()
  const { user } = useUserStatus()
  const { handleLogout } = useAuth()

  const menuItems: NavbarItem[] = routes
    .filter((item) => item.meta && item.meta.showInNavBar)
    .sort((a, b) => (a.meta.order ?? 10) - (b.meta.order ?? 10))
    .map((item) => ({ path: item.path, title: item.meta.title, dois: 2 }))

  let parsedNavbarItems: NavbarItem[]

  try {
    parsedNavbarItems = navbarItemsSchema.parse(menuItems)
  } catch (error) {
    console.log(error)
    parsedNavbarItems = []
  }

  const dropdown: DropdownItem[][] = [
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
        color: 'error',
      },
    ],
  ]

  const navbar = { menu: parsedNavbarItems, dropdown, user: user.value }

  return { navbar }
}

export default useNavbar
