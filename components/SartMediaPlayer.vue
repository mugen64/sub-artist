<template>
  <div class="sart-media-player">
    <div v-if="!mediaUri" class="sart-media-player__error">
      <span v-if="mediaUri"> Can't Play </span>
      <br />
      <material-icon
        icon="arrow-right-drop-circle"
        class="txt--large"
        @click.native="errorIconClicked"
      />
      <br />
      {{ mediaError }}
    </div>
    <div v-else class="sart-media-player__container">
      <video
        v-show="mediaFile.kind === 'video'"
        ref="videoPlayer"
        :src="mediaUri"
        controls
        @timeupdate="$emit('timeupdate', $event)"
        @play="$emit('play', $event)"
        @playing="$emit('pause', $event)"
        @pause="$emit('pause', $event)"
        @ended="$emit('ended', $event)"
        @progress="$emit('progress', $event)"
      >
        HTML5 Video Not Supported by your Browser
      </video>
      <audio
        v-show="mediaFile.kind === 'audio'"
        ref="audioPlayer"
        :src="mediaUri"
        controls
        @timeupdate="$emit('timeupdate', $event)"
        @play="$emit('play', $event)"
        @playing="$emit('pause', $event)"
        @pause="$emit('pause', $event)"
        @ended="$emit('ended', $event)"
        @progress="$emit('progress', $event)"
      >
        HTML5 Audio Not Supported by your Browser
      </audio>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mediaUri: {
      type: String,
      default: null
    },
    mediaFile: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    mediaError() {
      if (!this.mediaUri) return 'Please Load Video';
      return 'Unknown Error';
    },
    isVideo() {
      return this.mediaFile.kind === 'video';
    }
  },
  methods: {
    errorIconClicked() {
      if (!this.mediaUri) this.$emit('req-media-uri');
    },
    play(timeInFloat) {
      const player = this.isVideo
        ? this.$refs.videoPlayer
        : this.$refs.audioPlayer;
      // TODO find if there is another way of doing this
      player.play();
      player.currentTime = timeInFloat;
    }
  }
};
</script>
<style scoped lang="scss">
@import '~/styles/_variables.scss';
.sart-media-player {
  width: 100%;
  min-height: 50vh;
  display: flex;
  background-color: $black;

  &__error {
    color: $white;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  &__container {
    display: flex;
    width: 100%;
    justify-content: center;
    // video {
    //   margin: auto;
    // }
  }
}
</style>
