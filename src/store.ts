import Vue from 'vue';
import Vuex from 'vuex';
import CustomColumnModel from './models/CustomColumnModel';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customColumns: Array<CustomColumnModel>()
  },
  mutations: {
    addCustomColumn(state, customColumn: CustomColumnModel) {
      state.customColumns.push(customColumn);
    }
  },
  actions: {
    addCustomColumn(context, customColumn: CustomColumnModel) {
      context.commit('addCustomColumn', customColumn);
    }
  },
});
