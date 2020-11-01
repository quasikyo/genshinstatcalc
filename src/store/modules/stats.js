import { sumArtifactBuffs, calculateOtherBuffs, buffHelper } from '../util/stats';

// TODO: modify to be per character instead of global
// TODO: convert artifact buff structure to the one used for other buffs

const state = {
  level: 1,
  weapon: {
    atk: 0,
    substat: {
      stat: 'maxHP',
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
  artifactBuffs: {},
  otherBuffTypes: ['flat', 'percent', 'percentOfOther',],
  otherBuffs: {},
};

const getters = {
  statNames(state) {
    return function(areFlat, ignore=false, includeDmgBonuses=false) {
      let names = Object.keys(state.baseStats);
      names = names.filter((name) => ignore || state.baseStats[name].isFlat == areFlat);
      if (includeDmgBonuses) {
        names.push('dmg', 'normal', 'charged', 'skill', 'burst');
      } // if
      return names;
    };
  },
  totalStat(state) {
    return function(stat) {
      // Would sometimes result in a string
      let base = Number(state.baseStats[stat].value);

      // Apply buffs from artifacts and other sources
      let { percentagesSum, flatSum } = sumArtifactBuffs(state, stat);
      const {
        percentageIncrease,
        flatIncrease,
      } = calculateOtherBuffs(state, stat, getters.totalStat);
      percentagesSum += percentageIncrease;
      flatSum += flatIncrease;

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
      return total;
    };
  },
  dmgBonuses(state) {
    const bonuses = {
      dmg: 0,
      normal: 0,
      charged: 0,
      skill: 0,
      burst: 0,
    };

    for (const bonus in bonuses) {
      const artifactCorrespondingBuffs = state.artifactBuffs[bonus];
      if (artifactCorrespondingBuffs) {
        artifactCorrespondingBuffs.forEach((buff) => {
          if (buff.isFlat) {
            throw new Error('DMG Bonuses can only be expressed with %.');
          } // if
          bonuses[bonus] += buff.value;
        });
      } // if

      const otherCorrespondingBuffs = state.otherBuffs[bonus];
      if (otherCorrespondingBuffs) {
        otherCorrespondingBuffs.forEach((buff) => {
          const isActive = buff.isPermanent || buff.isActive;
          if (!isActive) {
            return;
          } // if

          if (buff.type != 'percent') {
            throw new Error('DMG Bonuses can only be expressed with %.');
          } // if
          bonuses[bonus] += Number(buff.value);
        });
      } // if
    } // for
    return bonuses;
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
  setArtifactBuffs(state, artifacts) {
    state.artifactBuffs = {};

    const artifactBuffHelper = buffHelper(state)('artifactBuffs');
    artifacts.forEach((artifact) => {
      artifactBuffHelper(artifact.mainStat);
      artifact.substats.forEach((substat) => {
        artifactBuffHelper(substat);
      });
    });
  },
  setOtherBuffs(state, otherBuffs) {
    state.otherBuffs = {};

    const otherBuffHelper = buffHelper(state)('otherBuffs');
    otherBuffs.forEach((buff) => {
      otherBuffHelper(buff);
    });
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
  setArtifactBuffs({ commit }, artifacts) {
    commit('setArtifactBuffs', artifacts);
  },
  setOtherBuffs({ commit }, otherBuffs) {
    commit('setOtherBuffs', otherBuffs)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
