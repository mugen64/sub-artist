<template>
  <!-- App Footer -->
  <footer class="sart-app-footer">
    Copyright &#x00040;Sub Artist {{ year }}
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
.sart-app-footer {
  display: block;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 100vw;
  min-height: 50px;
  padding: 1rem;
}
</style>
