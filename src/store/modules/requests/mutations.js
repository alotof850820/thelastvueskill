export default {
  addRequest(state, payload) {
    return state.requests.unshift(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
};
