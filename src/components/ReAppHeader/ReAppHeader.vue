<script>
  import { CHeaderToggler, CContainer, CCardTitle } from '@coreui/vue-pro';
  import { CIcon } from '@coreui/icons-vue';
  export default {
  name: 'ReAppHeader',
  components: {
    CIcon,
    CCardTitle,
    CContainer,
    CHeaderToggler
  },
  props: {
    toggleSidebar: {
      type: Function,
      required: true
    },
    appName: {
      type: String,
      required: true
    },
  }
};
</script>

<template>
  <div class="header-container">
    <div class="header bg-re-red" />
    <div class="overlay-container px-2 pt-2">
      <CContainer fluid>
        <div class="container-content">
          <div>
            <CHeaderToggler class="ps-1 text-light" @click="toggleSidebar">
              <CIcon icon="cil-menu" size="lg"/>
            </CHeaderToggler>
          </div>
          <div>
            <CCardTitle class="text-white">{{ appName }}</CCardTitle>
          </div>
          <div>
            <!-- Right side blank -->
          </div>
        </div>
      </CContainer>
    </div>
  </div>
</template>

<style>
.header-container {
  min-height: 75px;
  width: 100%;
  position: sticky;
  overflow-x: hidden;
  top: 0;
  z-index: 1031;
}

.header {
  width: 120%;
  transform: translateX(-8.5%);
  height: 50px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top: 0;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  box-shadow: 0 .3rem .4rem rgba(var(--cui-elevation-base-color), .2)
}

.overlay-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  z-index: 1033;
}

.container-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
</style>
