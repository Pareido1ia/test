<script>
import { onMounted, ref, watch } from 'vue';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/vue-pro';

export default {
  name: 'ReAppBreadcrumb',
  components: { CBreadcrumb, CBreadcrumbItem },
  props: {
    router: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const breadcrumbs = ref([]);

    const getBreadcrumbs = () => {
      return props.router.currentRoute.value.matched.map((route) => {
        return {
          active: route.path === props.router.currentRoute.value.fullPath,
          name: route.name,
          path: `${props.router.options.history.base}${route.path}`
        };
      });
    };

    watch(
        () => props.router.currentRoute.value,
        () => {
          breadcrumbs.value = getBreadcrumbs();
        },
        { immediate: true }
    );

    onMounted(() => {
      breadcrumbs.value = getBreadcrumbs();
    });

    return {
      breadcrumbs
    };
  }
};
</script>

<template>
  <CBreadcrumb class="d-md-down-none me-auto mb-0">
    <CBreadcrumbItem
        v-for="item in breadcrumbs"
        :key="item.path"
        :href="item.active ? '' : item.path"
        :active="item.active"
        class="text-high-emphasis"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>
