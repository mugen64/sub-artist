import Vue from 'vue';
// layout components
import SartApp from '../components/layouts/SartApp.vue';
import SartAppbar from '../components/layouts/SartAppBar.vue';
import SartAppFooter from '../components/layouts/SartAppFooter.vue';
import SartContainer from '../components/layouts/SartContainer.vue';
import Spacer from '../components/layouts/Spacer.vue';
import SartTiles from '../components/layouts/SartTiles.vue';
import MaterialIcon from '../components/MaterialIcon.vue';
import SartToolbar from '../components/layouts/SartToolbar.vue';

Vue.component('sart-app', SartApp);
Vue.component('sart-appbar', SartAppbar);
Vue.component('sart-app-footer', SartAppFooter);
Vue.component('sart-container', SartContainer);
Vue.component('sart-tiles', SartTiles);
Vue.component('spacer', Spacer);
Vue.component('material-icon', MaterialIcon);
Vue.component('sart-toolbar', SartToolbar);
