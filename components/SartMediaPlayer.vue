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
  </div>
</template>
<script>
export default {
  props: {
    mediaUri: {
      type: String,
      default: null
    }
  },
  computed: {
    mediaError() {
      if (!this.mediaUri) return 'Please Load Video';
      return 'Unknown Error';
    }
  },
  data() {
    return {};
  },
  methods: {
    errorIconClicked() {
      if (!this.mediaUri) this.$emit('req-media-uri');
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
}
</style>
