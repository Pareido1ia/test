<script>

import toastState from './toastState';
import {CToast, CToastBody, CToastClose, CToaster} from '@coreui/vue-pro';

export default {
  name: 'ReToaster',
  components: {CToastClose, CToastBody, CToast, CToaster},
  computed: {
    toasts() {
      return toastState.state.toasts;
    }
  },
}
</script>

<template>
  <CToaster placement="top-end" class="re-toaster" visible>
    <CToast v-for="(toast, index) in toasts" :key="index" :color="toast.color" :delay=5000 visible>
      <div class="d-flex">
        <CToastBody :class="toast.textColor && `text-${toast.textColor}`">
          <strong>{{ toast.message }}</strong>
        </CToastBody>
        <CToastClose class="me-2 m-auto"/>
      </div>
    </CToast>

    <!--  Test Toast  -->
    <CToast :delay=50000 visible>
      <div class="d-flex">
        <CToastBody>
          <strong>Test Toast</strong>
        </CToastBody>
        <CToastClose class="me-2 m-auto"/>
      </div>
    </CToast>
  </CToaster>
</template>
