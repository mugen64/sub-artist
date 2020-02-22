/**
 * Plugin Bussiness Logic
 */
import subtitleLogicInit from '~/logic/subtitles';
export default ({ app }, inject) => {
  inject('subtitles', subtitleLogicInit(app.$moment));
};
