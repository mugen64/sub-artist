<template>
  <sart-app>
    <sart-appbar ref="appBar" />
    <sart-container
      tag="main"
      fluid
      app
      :style="`margin-top:${contentMarginTop}`"
    >
      <nuxt />
    </sart-container>
    <sart-app-footer />
  </sart-app>
</template>
<script>
import SartApp from '~/components/layouts/SartApp';
import SartAppbar from '~/components/layouts/SartAppBar';
import SartAppFooter from '~/components/layouts/SartAppFooter';
import SartContainer from '~/components/layouts/SartContainer';
export default {
  components: {
    SartApp,
    SartAppbar,
    SartAppFooter,
    SartContainer
  },
  computed: {
    contentMarginTop() {
      if (this.$refs.appBar) {
        // TODO For some reason i can't access refs here
        return `${this.$refs.appBar.clientHeight}px`;
      }
      return '50px';
    }
  }
};
</script>
