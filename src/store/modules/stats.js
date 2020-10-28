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
    return function(areFlat, ignore=false) {
      const names = Object.keys(state.baseStats);
      return names.filter((name) => ignore || state.baseStats[name].isFlat == areFlat);
    };
  },
  totalStat(state) {
    return function(stat) {
      let base = state.baseStats[stat].value;

      // Apply buffs from artifacts and other sources
      // TODO: add error checking for flat increases on a non-flat base
      let percentagesSum = 0;
      let flatSum = 0;
      if (state.buffs[stat]) {
        state.buffs[stat].forEach((increase) => {
          if (increase.isFlat) {
            flatSum += increase.value;
          } else {
            percentagesSum += increase.value;
          } // if
        });
      } // if

      // Apply weapon buffs if not already included
      // TODO: add error checking for flat increases on a non-flat base
      const { substat, atk } = state.weapon;
      if (stat == substat.stat) {
        if (substat.isFlat) {
          flatSum += substat.value;
        } else {
          percentagesSum += substat.value;
        } // if
      } // if

      if (stat == 'atk' && !state.includesWeaponAtk) {
        base += atk;
      } // if

      let total;
      if (state.baseStats[stat].isFlat) {
        // If the base stat itself is flat, it can be increased
        // by other flat increases as well as percentage increases.
        total = base * (1 + percentagesSum) + flatSum;
      } else {
        // If the base stat is not flat, add the other
        // percentages onto it to get the total percent.
        total = base + percentagesSum;
      } // if
      console.log(`${stat}: ${total}`); // debug
      return total;
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
  setBaseStat(state, { statName, stat, includesWeaponAtk }) {
    state.baseStats[statName] = stat;
    state.includesWeaponAtk = includesWeaponAtk;
  },
  setArtifactBuffs(state, buffs) {
    state.buffs = buffs;
  },
};

const actions = {
  setLevel({ commit }, level) {
    commit('setLevel', level);
  },
  setWeapon({ commit }, weapon) {
    commit('setWeapon', weapon);
  },
  setBaseStat({ commit }, { statName, stat, includesWeaponAtk }) {
    commit('setBaseStat', { statName, stat, includesWeaponAtk });
  },
  setArtifactBuffs({ commit }, buffs) {
    commit('setArtifactBuffs', buffs);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
