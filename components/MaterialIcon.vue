<template>
  <i :class="`material-icon mdi mdi-${icon}`" />
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'home'
    }
  }
};
</script>
<style lang="scss" scoped>
.material-icon {
  cursor: pointer;
}
</style>
