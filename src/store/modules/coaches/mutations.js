export default {
  registerCoach(state, payload) {
    state.coaches.unshift(payload);
  },
  setCoaches(state, payload) {
    //將fetch的data傳至state
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
