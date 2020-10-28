// TODO: modify to be per character instead of global

const state = {
  baseStats: {
    maxHP: { value: 0, },
    atk: { value: 0, },
    def: { value: 0, },
    elementalMastery: { value: 0, },
    maxStamina: { value: 0, },
    critRate: { value: 0, },
    critDMG: { value: 0, },
    healingBonus: { value: 0, },
    incomingHB: { value: 0, },
    energyRecharge: { value: 0, },
    reduceCD: { value: 0, },
    powerfulShield: { value: 0, },
    elementalBonus: { value: 0, },
    elementalRES: { value: 0, },
    physicalBonus: { value: 0, },
    physicalRES: { value: 0, },
  },
  buffs: {
    atk: [
      { value: 0, flat: true, },
    ],
    def: [
      { value: 0, flat: true, },
    ],
  },
};

const getters = {
  stats() {
    return Object.keys(state.baseStats);
  },
  totalStat(stat) {
    const base = state.baseStats[stat].value;

    let percentagesSum = 0;
    let flatSum = 0;
    state.buffs[stat].forEach((increase) => {
      if (increase.flat) {
        flatSum += increase.value;
      } else {
        percentagesSum += increase.value;
      } // if
    });

    return base * (1 + percentagesSum) + flatSum;
  },
};

const mutations = {
  setBaseStat(stat, value) {
    state.baseStats[stat].value = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
