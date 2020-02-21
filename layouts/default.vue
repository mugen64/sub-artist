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
export default {
  components: {},
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
