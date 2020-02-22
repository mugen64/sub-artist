<template>
  <div class="sart-subtitle-preview">
    <p
      v-for="(sub, i) in subtitles"
      :key="`sub_${i}`"
      :class="{ 'txt-bold-underline': isCurrentSubtitle(sub) }"
      @click="onSubClicked(sub)"
    >
      {{ sub.text }}
      <br />
    </p>
  </div>
</template>
<script>
export default {
  props: {
    subtitles: {
      type: Array,
      default() {
        return [];
      }
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    isCurrentSubtitle(sub) {
      return this.$subtitles.isTimeBetween(
        this.$subtitles.formatDurationFromFloat(this.currentTime),
        sub.start,
        sub.end
      );
    },
    onSubClicked(sub) {
      this.$emit('sub-clicked', sub);
    }
  }
};
</script>
<style lang="scss">
.sart-subtitle-preview {
  p {
    cursor: pointer;
    &:hover {
      font-weight: 700;
    }
  }
}
</style>
