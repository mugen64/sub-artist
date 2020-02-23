<template>
  <textarea
    v-model="transcript"
    name="transcript"
    cols="20"
    class="transcript-editor fill-width"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    transcript: {
      set(v) {
        this.$emit('input', v);
      },
      get() {
        return this.value;
      }
    }
  }
};
</script>
<style lang="scss">
.transcript-editor {
  min-height: 60px;
}
</style>
