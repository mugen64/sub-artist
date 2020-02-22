<template>
  <sart-tiles tag="section" class="workspace">
    <sart-container
      tag="article"
      style="flex-grow: 1;"
      class="workspace__media-viewer"
    >
      <h1>Annotate and Sub Media {{ mediaFile.name }}</h1>
      <input
        ref="loadMediaFileBtn"
        type="file"
        data-test="loadMediaFileBtn"
        @change="fileLoaded"
      />
      <sart-media-player
        :media-uri="mediaUri"
        :media-file="mediaFile"
        @req-media-uri="requestVideo"
        @timeupdate="mediaTimeUpdate"
      />
    </sart-container>
    <sart-container tag="article" style="min-width:300px;">
      <h2>{{ mediaFile.name }} SubTitle Preview</h2>
    </sart-container>
    <sart-container fluid tag="article">
      <h3>Editor</h3>
      <sart-toolbar>
        <button :disabled="!mediaUri">Timestep={{ currentTime }}</button>
        <spacer />
      </sart-toolbar>
    </sart-container>
  </sart-tiles>
</template>

<script>
import SartMediaPlayer from '~/components/SartMediaPlayer';
export default {
  components: { SartMediaPlayer },
  data() {
    return {
      mediaUri: null,
      mediaFile: {
        name: 'Untitled Media'
      },
      // TODO leave file reader code in just incase
      fileReader: null,
      currentTime: 0
    };
  },
  mounted() {
    this.fileReader = new FileReader();
    this.fileReader.onload = (evt) => {
      console.log(evt);
    };
    this.fileReader.onerror = (evt) => {
      console.error('An error ocurred reading the file', evt);
    };
  },
  beforeDestroy() {
    // clean up
    this.fileReader.onload = null;
    this.fileReader.onerror = null;
    if (this.mediaUri) {
      URL.revokeObjectURL(this.mediaUri);
    }
  },
  methods: {
    requestVideo() {
      this.$refs.loadMediaFileBtn.click();
    },
    fileLoaded() {
      const files = this.$refs.loadMediaFileBtn.files; // FileList
      if (files.length > 0) {
        const file = files[0];
        // console.log(file);
        if (file.type.match(/video/)) {
          // video file
          // console.log('Video File');
          this.mediaUri = URL.createObjectURL(file);
          this.mediaFile.kind = 'video';
          this.mediaFile.type = file.type;
          this.mediaFile.name = file.name;
          this.mediaFile.size = file.size;
        } else if (file.type.match(/audio/)) {
          // audio file
          this.mediaUri = URL.createObjectURL(file);
          this.mediaFile.kind = 'audio';
          this.mediaFile.type = file.type;
          this.mediaFile.name = file.name;
          this.mediaFile.size = file.size;
          // console.log('Audio File');
        } else {
          console.log('File Not supported');
        }
      } else {
        console.log('No File Selected');
      }
    },
    mediaTimeUpdate(evt) {
      console.log(evt);
      this.formatTime(evt.target.currentTime);
    },
    formatTime(time) {
      // console.log(time);
      this.currentTime = time;
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
