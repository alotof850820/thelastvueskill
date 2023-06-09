export default {
  requests(state, _, _2, rootGetters) {
    //需篩選出coachid的req
    const coachId = rootGetters.userId;
    const req = state.requests.filter((coach) => coach.coachId === coachId);
    return req;
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
