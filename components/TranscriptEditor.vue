<template>
  <textarea
    v-model="transcript"
    name="transcript"
    cols="10"
    class="fill-width"
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
