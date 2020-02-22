import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

/**
 * Moment Plugin adds $moment to Nuxt Context
 */
export default (context, inject) => {
  inject('moment', moment);
};
