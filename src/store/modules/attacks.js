const state = {
  dmgTypes: ['DMG', 'Normal', 'Charged', 'Skill', 'Burst',],
  elementalTypes: ['PHYS', 'Elemental'],
  attacks: [],
};

const getters = {
/**
 * Returns a function to calculate DMG of attacks as described below.
 *
 * @param {object} state the state of this store
 * ---
 * Returns the total DMG of all attacks in `state.attacks`.
 *
 * @param {number} totalAtk  the total value of the ATK stat
 * @param {number} phys      the total PHYS DMG% bonus as a decimal
 * @param {number} elemental the total Elemental DMG% bonus as a decimal
 *
 * @param {object} dmgTypeBonuses         object containing other DMG bonuses
 * @param {number} dmgTypeBonuses.dmg     the total DMG% bonus as a decimal
 * @param {number} dmgTypeBonuses.normal  the total Normal% bonus as a decimal
 * @param {number} dmgTypeBonuses.charged the total PHYS DMG% bonus as a decimal
 * @param {number} dmgTypeBonuses.skill   the total Skill% bonus as a decimal
 * @param {number} dmgTypeBonuses.burst   the total Burst% bonus as a decimal
 *
 * @param {object}  crit         object containing crit information
 * @param {boolean} crit.apply   apply crit dmg to the total DMG value;
 *                               takes priority over `crit.average`
 * @param {boolean} crit.average average `crit.dmg` with `crit.rate`
 * @param {number}  crit.dmg     the crit DMG% as a decimal
 * @param {number}  crit.rate    the percentage rate of crits as a decimal
 *
 * @return {array} array containing objects with a `label` and `value` property
 */
  calculateAttacks(state) {
    return function(totalAtk, phys, elemental, dmgTypeBonuses, crit) {
      const calculatedAttacks = state.attacks.map((attack) => {
        // Init to one of the DMG bonuses
        let dmgBonusSum = attack.elementalType == 'PHYS' ? phys : elemental;

        // Added to all damage
        dmgBonusSum += dmgTypeBonuses['dmg'];
        // Conditionally apply the rest of the bonuses
        state.dmgTypes.forEach((type) => {
          if (attack.dmgType == type) {
            dmgBonusSum += dmgTypeBonuses[type.toLowerCase()];
          } // if
        });

        let totalDMG = totalAtk * attack.percentOfAtk * (1 + dmgBonusSum);
        if (crit.apply) {
          totalDMG *= (1 + crit.dmg);
        } else if (crit.average) {
          totalDMG *= (1 + (crit.rate * crit.dmg));
        } // if

        return {
          label: attack.label,
          value: totalDMG.toFixed(2),
        };
      });
      return calculatedAttacks;
    };
  },
};

const mutations = {
  addAttack(state, attack) {
    state.attacks.push(attack);
  },
  setAttack(state, { index, newAttack }) {
    state.attacks[index] = newAttack;
  },
  removeAttack(state, index) {
    state.attacks.splice(index, 1);
  },
};

const actions = {
  /**
   * @param {object} context object exposing properties of this store
   */
  addAttack({ commit }, attack) {
    commit('addAttack', attack);
  },
  setAttack({ commit }, { index, newAttack }) {
    commit('setAttack', index, newAttack);
  },
  removeAttack({ commit }, index) {
    commit('removeAttack', index);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
