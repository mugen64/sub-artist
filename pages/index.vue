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
      <br />
      <p class="txt--danger">
        [Note: Your video or audio is not uploaded or backed up any where ]
      </p>
      <sart-media-player
        ref="mediaPlayer"
        class="workspace__media-player"
        :media-uri="mediaUri"
        :media-file="mediaFile"
        @req-media-uri="requestVideo"
        @play="playMedia"
        @timeupdate="mediaTimeUpdate"
      />
    </sart-container>
    <sart-container tag="article" style="min-width:300px;">
      <h2>Subtitle Preview</h2>
      <sart-subtitle-preview
        ref="subtitlePreviewer"
        class="workspace__preview"
        :subtitles="subtitles"
        :current-time="currentTime"
        @sub-clicked="jumpToSubTime"
      />
    </sart-container>
    <sart-container fluid tag="article">
      <hr />
      <h3>Cue Editor</h3>
      <sart-toolbar>
        <button
          class="btn--primary"
          :disabled="!mediaUri"
          :class="{ 'btn--success': !!startTime }"
          @click="start"
        >
          Start={{ startTime || formattedCurrentTime }}
        </button>
        <button
          class="btn--primary"
          :class="{ 'btn--success': !!endTime }"
          :disabled="!mediaUri"
          @click="endTime = formattedCurrentTime"
        >
          End={{ endTime || formattedCurrentTime }}
        </button>
        <spacer />
        <button :disabled="!mediaUri" @click="commit">
          Add
          <material-icon icon="plus-thick" />
        </button>
        <button @click="subtitles = []">
          Clear
          <material-icon icon="notification-clear-all" />
        </button>
        <button :disabled="subtitles.length < 1" @click="generate">
          Generate
        </button>
        <a
          v-show="fileWriter.uri"
          class="btn"
          :class="{ 'btn-primary': !!fileWriter.uri }"
          :href="fileWriter.uri"
          :download="`${mediaFile.name}.vtt`"
        >
          Download
        </a>
      </sart-toolbar>
      <transcript-editor v-model="subtitle" />
    </sart-container>
  </sart-tiles>
</template>

<script>
import SartMediaPlayer from '~/components/SartMediaPlayer';
import TranscriptEditor from '~/components/TranscriptEditor';
import SartSubtitlePreview from '~/components/SartSubtitlePreview';

export default {
  components: { SartMediaPlayer, TranscriptEditor, SartSubtitlePreview },
  data() {
    return {
      mediaUri: null,
      mediaFile: {
        name: 'Untitled Media'
      },
      // TODO leave file reader code in just incase
      fileReader: null,
      fileWriter: {
        uri: null,
        blob: null
      },
      currentTime: 0,
      startTime: null,
      endTime: null,
      subtitle: '',
      subtitles: [],
      wTimeFormat: 'hh:mm:ss.SSS'
    };
  },
  computed: {
    formattedCurrentTime() {
      return this.$subtitles.formatDurationFromFloat(this.currentTime);
    }
  },
  mounted() {
    this.fileReader = new FileReader();
    this.fileReader.onload = (evt) => {
      // console.log(evt);
      this.subtitles = this.$subtitles.generateObjArrayFromWebVttText(
        evt.target.result
      );
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
    this.cleanCurrentFile();
  },
  methods: {
    requestVideo() {
      this.$refs.loadMediaFileBtn.click();
    },
    cleanCurrentFile() {
      if (this.fileWriter.uri) {
        URL.revokeObjectURL(this.fileWriter.uri);
        this.fileWriter.blob = null;
      }
    },
    fileLoaded() {
      const files = this.$refs.loadMediaFileBtn.files; // FileList
      if (files.length > 0) {
        const file = files[0];
        console.log(file);
        let idx = file.name.lastIndexOf('.');
        if (idx === -1) idx = file.name.length;
        const ext = file.name.substring(idx + 1, file.name.length);
        const name = file.name.substring(idx + 1, file.name.length);
        if (file.type.match(/video/)) {
          // video file
          // console.log('Video File');
          this.mediaUri = URL.createObjectURL(file);
          this.mediaFile.kind = 'video';
          this.mediaFile.type = file.type;
          this.mediaFile.name = file.name;
          this.mediaFile.size = file.size;
          this.mediaFile.fileName = name;
          this.mediaFile.ext = ext;
        } else if (file.type.match(/audio/)) {
          // audio file
          this.mediaUri = URL.createObjectURL(file);
          this.mediaFile.kind = 'audio';
          this.mediaFile.type = file.type;
          this.mediaFile.name = file.name;
          this.mediaFile.size = file.size;
          this.mediaFile.fileName = name;
          this.mediaFile.ext = ext;
          // console.log('Audio File');
        } else if (file.type.match(/text\/vtt/) || ext === 'vtt') {
          if (this.fileReader) {
            this.fileReader.readAsText(file, 'UTF-8');
          }
        } else {
          console.log('File Not supported');
        }
      } else {
        console.log('No File Selected');
      }
    },
    mediaTimeUpdate(evt) {
      // console.log(evt);
      this.currentTime = evt.target.currentTime;
    },
    start() {
      this.startTime = this.formattedCurrentTime;
      this.endTime = null;
    },
    commit() {
      if (!this.startTime || !this.endTime) {
        console.log(
          'Cue Times Invalid Make Sure Start is before Endtime and both are captured'
        );
        return;
      }
      // console.log(this.$moment(this.endTime).isBefore(this.startTime));
      if (!this.$subtitles.isTimeBefore(this.endTime, this.startTime))
        this.subtitles.push({
          start: this.startTime,
          end: this.endTime,
          text: this.subtitle
        });
      else
        console.log(
          'Cue Times Invalid Make Sure Start is before Endtime and both are captured'
        );
    },
    jumpToSubTime(sub) {
      if (this.mediaUri) {
        this.$refs.mediaPlayer.play(
          this.$subtitles.fromFormattedDurationToFloat(sub.start)
        );
      }
    },
    playMedia() {
      this.$refs.subtitlePreviewer.start();
    },
    pauseMedia() {
      this.$refs.subtitlePreviewer.stop();
    },
    generate() {
      this.cleanCurrentFile();
      this.fileWriter.blob = new Blob(
        [
          this.$subtitles.generateWebVttTextFromObjArray(
            this.subtitles,
            `Subtitles For ${this.mediaFile.name} Generated By Sub Artists`
          )
        ],
        {
          type: 'text/vtt;charset=utf-8'
        }
      );
      this.fileWriter.uri = URL.createObjectURL(this.fileWriter.blob);
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
  &__preview {
    max-height: 360px;
    overflow-y: scroll;
  }
}
</style>
