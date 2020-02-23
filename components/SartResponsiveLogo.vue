<template>
  <img
    class="sart-logo__responsive"
    alt="SA"
    src="/icon.png"
    width="32"
    height="32"
  />
</template>
<style>
.sart-logo__responsive {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
