<template>
  <textarea v-model="transcript" name="transcript" cols="30" rows="10" />
</template>
<script>
export default {
  data() {
    return {
      transcript: ''
    };
  }
};
</script>
