<template>
  <div class="sart-subtitle-preview">
    <p
      v-for="(sub, i) in subtitles"
      :key="`sub_${i}`"
      :class="{ 'txt-bold-underline': isCurrentSubtitle(sub) }"
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
        this.$subtitles.formatTimeFromFloat(this.currentTime),
        sub.start,
        sub.end
      );
    }
  }
};
</script>
