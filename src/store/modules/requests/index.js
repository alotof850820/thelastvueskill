import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      //Should have email message id coachId
      requests: [],
    };
  },
  mutations,
  getters,
  actions,
};
