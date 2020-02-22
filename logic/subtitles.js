/**
 * Contains Subtitle Logic
 */
export default (moment) => {
  // Todo move this time logic to a file detected to to time some >>>time<<<
  const timeFormats = {
    // for now since we only need webVttTime
    webVttTime: 'hh:mm:ss.SSS'
  };
  return {
    /**
     * Format from Time in float to a new format
     * @param {Float} timeInFloat
     * @param {String} timeUnits
     * @param {String} formatUsed
     * @param {Boolean} trim
     * @return {String}
     */
    formatTimeFromFloat(
      timeInFloat,
      timeUnits = 'seconds',
      formatUsed = 'webVttTime',
      trim = false
    ) {
      return moment
        .duration(timeInFloat, timeUnits)
        .format(timeFormats[formatUsed], { trim });
    },
    /**
     * Check if time of interest is between a times a and b
     * where a < b
     * @param {String} timeOfInterest
     * @param {String} timeA
     * @param {String} timeB
     * @param {String} formatUsed
     * @return {Boolean}
     */
    isTimeBetween(timeOfInterest, timeA, timeB, formatUsed = 'webVttTime') {
      const f = timeFormats[formatUsed];
      return moment(timeOfInterest, f).isBetween(
        moment(timeA, f),
        moment(timeB, f)
      );
    }
  };
};
