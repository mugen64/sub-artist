<template>
  <!-- Dynamic Component with user provided tag  -->
  <component
    :is="tag"
    class="sart-container"
    :class="{
      'sart-container--fluid': fluid,
      'sart-container--fill-height': fillHeight && !app,
      'sart-container--fill-height--app': app && fillHeight
    }"
  >
    <slot />
  </component>
</template>
<script>
/**
 * Dynamic Component with user provided tag
 * @props={tag:String=div, fluid:Boolean=false, fullHeight:Boolean=false, app:Boolean=false}
 */
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    fluid: {
      type: Boolean,
      default: false
    },
    fillHeight: {
      type: Boolean,
      default: false
    },
    app: {
      type: Boolean,
      default: false
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.sart-container {
  display: block;
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  &--fluid {
    width: 100%;
  }
  &--fill-height {
    height: 100%;
    &--app {
      // TODO For now use this value later calc it
      min-height: 90vh;
    }
  }
}
</style>
