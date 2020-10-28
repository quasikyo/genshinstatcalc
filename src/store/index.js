import Vue from 'vue'
import Vuex from 'vuex'

import stats from './modules/stats';
import attacks from './modules/attacks';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stats,
    attacks,
  },
});
