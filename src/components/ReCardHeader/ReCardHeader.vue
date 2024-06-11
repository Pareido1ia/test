<script>

import {CCardHeader, CCardSubtitle, CCardTitle} from '@coreui/vue-pro';
export default {
  name: 'ReCardHeader',
  components: {
    CCardTitle,
    CCardSubtitle,
    CCardHeader,
  },
  props: {
    id: {type: String, default: 'ReCardHeader'},
    heading: {type: String, default: 'ReCardHeader'},
    subHeading: {type: String, default: ''},
  },
}
</script>

<template>
  <CCardHeader>
    <CCardTitle>{{ heading }}</CCardTitle>
    <CCardSubtitle v-if=subHeading>{{ subHeading }}</CCardSubtitle>
  </CCardHeader>
</template>
