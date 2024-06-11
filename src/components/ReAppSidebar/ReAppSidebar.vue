<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {ReAppSidebarNav} from './ReAppSidebarNav'
import {CSidebar} from '@coreui/vue-pro';

export default {
  name: 'AppSidebar',
  components: {
    CSidebar,
    ReAppSidebarNav,
  },
  props: {
    appNav: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    return {
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>

<template>
  <CSidebar
    color-scheme="light"
    class="bg-white sidebar-below-header"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
        (event) =>
          $store.commit({
            type: 'updateSidebarVisible',
            value: event,
          })
     "
  >
    <ReAppSidebarNav class="mt-3" :app-nav="appNav"/>
  </CSidebar>
</template>
