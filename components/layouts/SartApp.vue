<template>
  <!-- App Wrapper  -->
  <div class="sart-app">
    <slot name="default" />
  </div>
  <!-- TODO Make this renderless = accepting multiple children -->
</template>
<style>
/* #__nuxt {
  width: 100%;
  min-height: 100vh;
}
#__layout {
  width: inherit;
  height: 100%;
} */
.sart-app {
  width: inherit;
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
