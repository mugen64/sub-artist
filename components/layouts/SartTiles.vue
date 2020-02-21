<template>
  <component :is="tag" class="sart-tiles">
    <slot name="default" />
  </component>
</template>
<script>
import SartContainer from '~/components/layouts/SartContainer';
export default {
  components: {
    SartContainer
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
};
</script>
<style lang="scss">
.sart-tiles {
  display: flex;
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
