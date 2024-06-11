import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import {
  CBadge,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CNavTitle,
} from '@coreui/vue-pro'
import {CIcon} from '@coreui/icons-vue';

const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '')

const isActiveLink = (route, link) => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) {
    return true
  }

  if (item.items) {
    return item.items.some((child) => isActiveItem(route, child))
  }

  return false
}

const ReAppSidebarNav = defineComponent({
  name: 'ReAppSidebarNav',
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  props: {
    appNav: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const firstRender = ref(true)

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            ...(firstRender.value && {
              visible: item.items.some((child) => isActiveItem(route, child)),
            }),
          },
          {
            togglerContent: () => [
              h(CIcon, {
                class: 'text-primary',
                customClassName: 'nav-icon',
                name: item.icon,
              }),
              item.name,
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        )
      }

      return item.to
        ? h(
          RouterLink,
          {
            to: item.to,
            custom: true,
          },
          {
            default: (props) =>
              h(
                resolveComponent(item.component),
                {
                  active: props.isActive,
                  href: props.href,
                  onClick: () => props.navigate(),
                },
                {
                  default: () => [
                    item.icon &&
                    h(CIcon, {
                      class: 'text-primary',
                      customClassName: 'nav-icon',
                      name: item.icon,
                    }),
                    item.name,
                    item.badge &&
                    h(
                      CBadge,
                      {
                        class: 'ms-auto',
                        color: item.badge.color,
                      },
                      {
                        default: () => item.badge.text,
                      },
                    ),
                  ],
                },
              ),
          },
        )
        : h(
          resolveComponent(item.component),
          {},
          {
            default: () => item.name,
          },
        )
    }

    return () =>
      h(
        CSidebarNav,
        {},
        {
          default: () => props.appNav.map((item) => renderItem(item)),
        },
      )
  },
})
export { ReAppSidebarNav }
