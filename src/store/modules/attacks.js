const state = {
  dmgTypes: ['DMG', 'Normal', 'Charged', 'Skill', 'Burst',],
  elementalTypes: ['PHYS', 'Elemental'],
  attacks: [],
};

const getters = {
  calculateAttacks(state) {
    return function(totalAtk, phys, elemental, dmgTypeBonuses) {
      const calculatedAttacks = state.attacks.map((attack) => {
        let dmgBonusSum = 0;

        if (attack.elementalType == 'PHYS') {
          dmgBonusSum += phys;
        } else {
          dmgBonusSum += elemental;
        } // if

        // Added to all damage
        dmgBonusSum += dmgTypeBonuses['dmg'];

        state.dmgTypes.forEach((type) => {
          if (attack.dmgType == type) {
            dmgBonusSum += dmgTypeBonuses[type.toLowerCase()];
          } // if
        });

        return {
          label: attack.label,
          value: (totalAtk * attack.percentOfAtk * (1 + dmgBonusSum)).toFixed(2),
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
