<script>

import {CNav, CNavItem, CNavLink, CTabContent, CTabPane} from '@coreui/vue-pro';
export default {
  name: 'ReTab',
  components: {
    CTabContent,
    CTabPane,
    CNavLink,
    CNavItem,
    CNav
  },
  props: {
    tabs: {
      type: Array,
      required: true
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      tabPaneActiveKey: 0,
    }
  },
  computed: {
    props() {
      //This will have all props passed down including any style or class
      return {...this.$attrs};
    },
    children() {
      //Filter slots that are a component or an HTML element (as comments will come through in slots)
      return this.$slots.default().filter((child) => typeof child.type === 'object' || typeof child.type === 'string');
    },
    normalizedTabs() {
      return this.tabs.map(tab => {
        // If tab is a string, convert it to an object with a default structure
        if (typeof tab === 'string') {
          return { name: tab, onClick: null, props: {} };
        }
        // If tab is already an object, use it as is or with default values
        return {
          name: tab.name || '',
          onClick: tab.onClick || null,
          props: tab.props || {}
        };
      });
    },
  },
  methods: {
    handleTabClick(tab, index) {
      if (tab.onClick && typeof tab.onClick === 'function') {
        //Custom function passed through to tab
        tab.onClick();
      }
      //Always change tab index
      this.tabPaneActiveKey = index;
    },
  }
}
</script>

<template>
  <div>
    <c-nav role="tablist" variant="tabs" v-bind="props">
      <template v-for="(tab, index) in normalizedTabs" v-bind:key="index">
        <c-nav-item v-bind="tab.props">
          <c-nav-link
              v-bind="tab.props"
              href="javascript:void(0);"
              :active="tabPaneActiveKey === index"
              @click="handleTabClick(tab, index)"
          >
            {{ tab.name }}
          </c-nav-link>
        </c-nav-item>
      </template>
    </c-nav>
    <c-tab-content>
      <template v-for="(child, index) in children" v-bind:key="'tab-' + index">
        <template v-if="lazyLoad ? tabPaneActiveKey === index : true">
          <c-tab-pane  role="tabpanel" :aria-labelledby="'tab-' + index" :visible="tabPaneActiveKey === index">
            <component :is="child" v-bind="child.props"></component>
          </c-tab-pane>
        </template>
      </template>
    </c-tab-content>
  </div>
</template>

