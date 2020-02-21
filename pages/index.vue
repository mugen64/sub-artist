<template>
  <sart-tiles tag="section" class="workspace">
    <sart-container
      tag="article"
      style="flex-grow: 1;"
      class="workspace__media-viewer"
    >
      <h1>Annotate and Sub Media Untitled Media</h1>
      <input ref="loadMediaFileBtn" type="file" data-test="loadMediaFileBtn" />
      <sart-media-player :media-uri="mediaUri" @req-media-uri="requestVideo" />
    </sart-container>
    <sart-container tag="article" style="min-width:300px;">
      <h2>Preview</h2>
    </sart-container>
    <sart-container fluid tag="article">
      <h2>Editor</h2>
    </sart-container>
  </sart-tiles>
</template>

<script>
import SartMediaPlayer from '~/components/SartMediaPlayer';
export default {
  components: { SartMediaPlayer },
  data() {
    return {
      mediaUri: null
    };
  },
  methods: {
    requestVideo() {
      this.$refs.loadMediaFileBtn.click();
    }
  }
};
</script>
<style lang="scss">
.workspace {
  min-height: 80vh;
  article {
    padding: 0.2rem;
  }
  &__media-viewer {
    border-left: none;
    border-top: none;
  }
}
</style>
