/**
 * Sums and returns the percentage and flat bonuses for the given stat.
 *
 * @param {Object} state the state of the stats's store
 * @param {string} stat  the name of the stat to add the buffs of
 */
// TODO: add error checking for flat increases on a non-flat base
export const sumArtifactBuffs = function(state, stat) {
  let percentagesSum = 0;
  let flatSum = 0;
  if (state.artifactBuffs[stat]) {
    state.artifactBuffs[stat].forEach((increase) => {
      if (increase.isFlat) {
        flatSum += increase.value;
      } else {
        percentagesSum += increase.value;
      } // if
    });
  } // if
  return { percentagesSum, flatSum };
};

/**
 * A curried helper function to add buffs to the stat's store.
 *
 * @param {Object}  state    the state of the stat's store
 * @param {string}  buffType either `'artifactBuffs'` or `'otherBuffs'`
 * @param {Object}  buff     the buff to add to the state
 */
export const buffHelper = function(state) {
  return function(buffType) {
    return function(buff) {
      const stat = buff.stat;

      if (!state[buffType][stat]) {
        state[buffType][stat] = [];
      } // if

      buff.value = Number(buff.value);
      state[buffType][stat].push(buff);
    };
  };
}; // buffHelper
