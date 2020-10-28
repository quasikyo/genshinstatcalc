const state = {
  dmgTypes: ['Normal', 'Charged', 'Skill', 'Burst',],
  elementalTypes: [
    'PHYS',
    'Pyro',
    'Hydro',
    'Dendro',
    'Electro',
    'Anemo',
    'Cryo',
    'Geo',
  ],
  attacks: [],
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
  mutations,
  actions,
};
