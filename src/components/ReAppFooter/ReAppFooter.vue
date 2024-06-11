<script>
import {CFooter, CCol} from '@coreui/vue-pro';

export default {
  name: 'ReAppFooter',
  components: {CCol, CFooter},
  props: {
    appName: { type: String, default: ''},
    group: { type: String, default: '' },
    version: { type: String, default: '' },
  }
}
</script>

<template>
  <CFooter class="bg-secondary bg-opacity-10">
    <CCol class="ms-1 h-100 mb-auto" size="4">
      <small v-if="appName">{{ appName }} &copy; {{ new Date().getFullYear() }} Red Energy.</small>
    </CCol>
    <div class="mx-2" />
    <CCol size="4" class="text-center h-100 mb-auto">
      <small v-if="group">User Group/Role: {{ group }}</small>
    </CCol>
    <div class="mx-2"></div>
    <CCol class="me-1 text-end h-100 mb-auto" size="4">
      <small v-if="version">Version: {{ version }}</small>
    </CCol>
  </CFooter>
</template>
