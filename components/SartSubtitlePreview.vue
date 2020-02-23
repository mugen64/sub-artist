<template>
  <div ref="subtitlesListContainer" class="sart-subtitle-preview">
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
  data() {
    return {
      currentSubObserver: null
    };
  },
  mounted() {
    this.currentSubObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          if (m.target.tagName === 'P' || m.target.tagName === 'p') {
            if (m.target.className.match(/txt-bold-underline/)) {
              // console.log(m.target);
              this.$nextTick(() => {
                this.$emit('scroll-target', m.target);
              });
            }
          }
        }
      }
    });
  },
  beforeDestroy() {
    this.stop();
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
    },
    start() {
      this.currentSubObserver.observe(this.$refs.subtitlesListContainer, {
        attributes: true,
        childList: true,
        subtree: true
      });
    },
    stop() {
      this.currentSubObserver.disconnect();
    }
  }
};
</script>
<style lang="scss">
.sart-subtitle-preview {
  padding: 0.5rem;
  p {
    cursor: pointer;
    max-width: 50ch;
    &:hover {
      font-weight: 700;
    }
  }
}
@media screen and (max-width: 860px) {
  .sart-subtitle-preview {
    p {
      max-width: 80ch;
    }
  }
}
</style>
