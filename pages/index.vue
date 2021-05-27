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
        @play="onPlayMedia"
        @timeupdate="mediaTimeUpdate"
      />
      <div v-if="showError" class="txt--danger alert">
        <button class="txt--danger" @click="showError = false">[x]</button>
        &nbsp; {{ errorText }}
      </div>
      <div v-if="showSuccess" class="txt--success alert">
        <button class="txt--success" @click="showSuccess = false">[x]</button>
        &nbsp; {{ successText }}
      </div>
    </sart-container>
    <sart-container tag="article" style="min-width:300px;">
      <h2>Subtitle Preview</h2>
      <sart-toolbar>
        <spacer />
        <label for="showActions" class="txt--danger">
          <input v-model="showActions" type="checkbox" name="showActions" />
          [Show Sub Actions]
        </label>
        <label for="autoScroll" class="txt--danger">
          <input v-model="autoScroll" type="checkbox" name="autoScroll" />
          [Auto scroll]
        </label>
      </sart-toolbar>
      <div ref="subtitlePreviewContainer" class="workspace__preview">
        <sart-subtitle-preview
          ref="subtitlePreviewer"
          :subtitles="subtitles"
          :show-actions="showActions"
          :current-time="currentTime"
          :auto-scroll="autoScroll"
          @sub-clicked="jumpToSubTime"
          @delete="deleteCue"
        />
      </div>
    </sart-container>
    <sart-container fluid tag="article">
      <!-- <hr /> -->
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
        <button :disabled="!mediaUri" @click="toggleMediaPlay">
          {{ playing ? 'Pause' : 'Play' }}
        </button>
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
          :class="{ 'btn--success': !!fileWriter.uri }"
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
import SartMediaPlayer from '../components/SartMediaPlayer.vue';
import TranscriptEditor from '../components/TranscriptEditor.vue';
import SartSubtitlePreview from '../components/SartSubtitlePreview.vue';

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
      showActions: false,
      autoScroll: true,
      showError: false,
      showSuccess: false,
      errorText: '',
      successText: '',
      playing: false
    };
  },
  computed: {
    formattedCurrentTime() {
      return this.$subtitles.formatDurationFromFloat(this.currentTime);
    }
  },
  mounted() {
    // this.$refs.subtitlePreviewContainer.addEventListener(
    //   'scroll',
    //   (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     e.returnValue = false;
    //     return false;
    //   },
    //   false
    // );
    this.fileReader = new FileReader();
    this.fileReader.onload = (evt) => {
      // console.log(evt);
      this.subtitles = this.$subtitles.generateObjArrayFromWebVttText(
        evt.target.result
      );
    };
    this.fileReader.onerror = (evt) => {
      // eslint-disable-next-line nuxt/no-env-in-hooks
      if (process.client) {
        this.error('An error ocurred reading the file', evt);
      }
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
        // console.log(file);
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
          this.error('File Type Not Supported');
        }
      } else {
        this.error('No File Selected');
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
        this.error(
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
        this.error(
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
    onPlayMedia() {
      this.playing = true;
      this.$refs.subtitlePreviewer.start();
    },
    onPauseMedia() {
      this.playing = false;
      this.$refs.subtitlePreviewer.stop();
    },
    toggleMediaPlay() {
      if (this.playing) {
        this.$refs.mediaPlayer.pause();
        this.playing = false;
      } else {
        this.$refs.mediaPlayer.play(this.currentTime);
        this.playing = true;
      }
    },
    deleteCue(i) {
      this.subtitles.splice(i, 1);
    },
    error(txt) {
      this.showError = true;
      this.errorText = txt;
    },
    success(txt) {
      this.showSuccess = true;
      this.successText = txt;
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
      this.success(
        'Successfully Generated For You A File To Download Click Download Button To Download'
      );
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
