import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
/**
 * Moment Plugin adds $moment to Nuxt Context
 */
export default (context, inject) => {
  momentDurationFormatSetup(moment);
  inject('moment', moment);
};
