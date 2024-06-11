<script>
import '../../../dist/style.css';
import {CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CRow} from '@coreui/vue-pro';
import ReTab from "./ReTab.vue";

export default {
  name: 'TabsExample',
  components: {CButton, CRow, CCol, CCard, CCardHeader, CCardTitle, CCardBody, ReTab},
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    customTabClick() {
      this.count ++;
    },
  },
}
</script>

<template>
  <CRow>
    <CCol :lg="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>Simple default tab layout example</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <ReTab :lazy-load="false" :tabs="['Small vue component', 'Large vue component', 'HTML div', 'HTML span']">
            <CButton color="primary">Component</CButton>

            <div class="p-2">
              hello - this is a HTML div
            </div>

            <span>
              hello - this is a HTML span<CButton color="primary" variant="outline">AAAAAh</CButton>
            </span>
          </ReTab>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :lg="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>Simple "underline" variant tab layout example</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <ReTab variant="underline" :tabs="['Vue component', 'HTML div', 'HTML span']">
            <CButton color="primary">Component</CButton>

            <div class="p-2">hello - this is a HTML div</div>

            <span>hello - this is a HTML span</span>
          </ReTab>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :lg="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>Advanced tab layout example</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <ReTab :tabs="[
              {
                name: 'Basic tab',
              },
              {
                name: 'Custom prop disabled tab',
                onClick: null,
                props: {
                  disabled: true
                }
              },
              {
                name: 'Custom on click function',
                onClick: customTabClick,
              }
        ]">
            <div class="p-2">
              standard tab
            </div>

            <div class="p-2">
              this tab is disabled by tab props
            </div>

            <div class="p-2">
              hello - this tab has been clicked {{ count }} times
            </div>
          </ReTab>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
