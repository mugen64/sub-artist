<template>
  <sart-tiles tag="section" class="workspace">
    <sart-container
      tag="article"
      style="flex-grow: 1;"
      class="bdr-solid--black workspace__media-viewer"
    >
      <h1>Annotate and Sub Media Untitled Media</h1>
    </sart-container>
    <sart-container tag="article" style="min-width:360px;">
      <h2>Preview</h2>
    </sart-container>
    <sart-container fluid tag="article">
      <h2>Editor</h2>
    </sart-container>
  </sart-tiles>
</template>

<script>
export default {
  components: {}
};
</script>
<style lang="scss">
.workspace {
  min-height: 80vh;
  article {
    padding: 0.5rem;
  }
  &__media-viewer {
    border-left: none;
    border-top: none;
  }
}
</style>
