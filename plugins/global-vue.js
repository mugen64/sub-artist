import Vue from 'vue';

// layout components
import SartApp from '~/components/layouts/SartApp';
import SartAppbar from '~/components/layouts/SartAppBar';
import SartAppFooter from '~/components/layouts/SartAppFooter';
import SartContainer from '~/components/layouts/SartContainer';
import Spacer from '~/components/layouts/Spacer';
import SartTiles from '~/components/layouts/SartTiles';

Vue.component('sart-app', SartApp);
Vue.component('sart-appbar', SartAppbar);
Vue.component('sart-app-footer', SartAppFooter);
Vue.component('sart-container', SartContainer);
Vue.component('sart-tiles', SartTiles);
Vue.component('spacer', Spacer);
