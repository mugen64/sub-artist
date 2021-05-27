const Vue = require('vue');
// layout components
const SartApp = require('../components/layouts/SartApp.vue');
const SartAppbar = require('../components/layouts/SartAppBar.vue');
const SartAppFooter = require('../components/layouts/SartAppFooter.vue');
const SartContainer = require('../components/layouts/SartContainer.vue');
const Spacer = require('../components/layouts/Spacer.vue');
const SartTiles = require('../components/layouts/SartTiles.vue');
const MaterialIcon = require('../components/MaterialIcon.vue');
const SartToolbar = require('../components/layouts/SartToolbar.vue');

Vue.component('sart-app', SartApp);
Vue.component('sart-appbar', SartAppbar);
Vue.component('sart-app-footer', SartAppFooter);
Vue.component('sart-container', SartContainer);
Vue.component('sart-tiles', SartTiles);
Vue.component('spacer', Spacer);
Vue.component('material-icon', MaterialIcon);
Vue.component('sart-toolbar', SartToolbar);
