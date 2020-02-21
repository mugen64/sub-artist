<template>
  <!-- App Header -->
  <header
    class="sart-appbar"
    :class="{
      'sart-appbar--fixed': fixed
    }"
  >
    <sart-responsive-logo />
    <nuxt-link
      to="/"
      role="brand title"
      class="sart-appbar__title txt-tfm--upc fw--xbold"
      v-text="`Sub Artist`"
    />
    <spacer />
    <nav class="sart-nav sart-nav--horizontal">
      <nuxt-link to="/docs" v-text="`Docs`" />
      <nuxt-link to="/issues" v-text="`Issues`" />
      <nuxt-link to="/github" v-text="`Github`" />
    </nav>
  </header>
</template>
<script>
import SartResponsiveLogo from '~/components/SartResponsiveLogo';
import Spacer from '~/components/layouts/Spacer';
/**
 * * @props={fixed:Boolean=true}
 */
export default {
  components: {
    SartResponsiveLogo,
    Spacer
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss">
@import '~/styles/_variables.scss';
.sart-appbar {
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  position: relative;
  max-height: 50px;
  padding: 1rem;
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid lighten($primary, $amount: 60);
  &--fixed {
    position: fixed;
    top: 0;
  }
  &__title {
    font-size: 1.5em;
    line-height: 1em;
    letter-spacing: -2px;
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
