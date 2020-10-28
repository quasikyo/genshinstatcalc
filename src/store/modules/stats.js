// TODO: modify to be per character instead of global

const state = {
  level: 1,
  weapon: {
    atk: 0,
    substat: {
      stat: '',
      value: 0,
      isFlat: true,
    },
  },
  baseStats: {
    maxHP: {
      value: 0,
      isFlat: true,
    },
    atk: {
      value: 0,
      isFlat: true,
    },
    def: {
      value: 0,
      isFlat: true,
    },
    elementalMastery: {
      value: 0,
      isFlat: true,
    },
    maxStamina: {
      value: 0,
      isFlat: true,
    },
    critRate: {
      value: 0.05,
      isFlat: false,
    },
    critDMG: {
      value: 0.50,
      isFlat: false,
    },
    healingBonus: {
      value: 0,
      isFlat: false,
    },
    incomingHB: {
      value: 0,
      isFlat: false,
    },
    energyRecharge: {
      value: 0,
      isFlat: false,
    },
    reduceCD: {
      value: 0,
      isFlat: false,
    },
    powerfulShield: {
      value: 0,
      isFlat: false,
    },
    elementalBonus: {
      value: 0,
      isFlat: false,
    },
    elementalRES: {
      value: 0,
      isFlat: false,
    },
    physicalBonus: {
      value: 0,
      isFlat: false,
    },
    physicalRES: {
      value: 0,
      isFlat: false,
    },
  },
  includesWeaponAtk: true,
  includesWeaponSubstat: false,
  buffs: {
    atk: [
      { value: 0, isFlat: true, },
    ],
    def: [
      { value: 0, isFlat: true, },
    ],
  },
};

const getters = {
  statNames(state) {
    return function(areFlat) {
      const names = Object.keys(state.baseStats);
      return names.filter((name) => state.baseStats[name].isFlat == areFlat);
    };
  },
  totalStat(state) {
    return function(stat) {
      let base = state.baseStats[stat].value;

      // Apply buffs from artifacts and other sources
      // TODO: add error checking for flat increases on a non-flat base
      let percentagesSum = 0;
      let flatSum = 0;
      // state.buffs[stat].forEach((increase) => {
      //   if (increase.isFlat) {
      //     flatSum += increase.value;
      //   } else {
      //     percentagesSum += increase.value;
      //   } // if
      // });

      // Apply weapon buffs if not already included
      // TODO: add error checking for flat increases on a non-flat base
      const { substat, atk } = state.weapon;
      if (stat == substat.stat && !state.includesWeaponSubstat) {
        if (substat.isFlat) {
          flatSum += substat.value;
        } else {
          percentagesSum += substat.value;
        } // if
      } // if

      if (stat == 'atk' && !state.includesWeaponAtk) {
        base += atk;
      } // if

      if (state.baseStats[stat].isFlat) {
        // If the base stat itself is flat, it can be increased
        // by other flat increases as well as percentage increases.
        return base * (1 + percentagesSum) + flatSum;
      } else {
        // If the base stat is not flat, add the other
        // percentages onto it to get the total percent.
        return base + percentagesSum;
      } // if
    };
  },
};

const mutations = {
  setLevel(state, level) {
    state.level = level;
  },
  setWeapon(state, weapon) {
    state.weapon = weapon;
  },
  setBaseStat(state, { statName, stat, includesWeaponAtk, includesWeaponSubstat }) {
    state.baseStats[statName] = stat;
    state.includesWeaponAtk = includesWeaponAtk;
    state.includesWeaponSubstat = includesWeaponSubstat;
  },
};

const actions = {
  setLevel({ commit }, level) {
    commit('setLevel', level);
  },
  setWeapon({ commit }, weapon) {
    commit('setWeapon', weapon);
  },
  setBaseStat({ commit }, { statName, stat, includesWeaponAtk, includesWeaponSubstat }) {
    commit('setBaseStat', { statName, stat, includesWeaponAtk, includesWeaponSubstat });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
