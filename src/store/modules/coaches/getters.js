export default {
  coaches(state) {
    return state.coaches;
  },
  // 確認是否有data
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, _, _2, rootGetters) {
    const coaches = state.coaches;
    const userId = rootGetters.userId;

    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true; //應該更新
    }
    //有時間戳 找出是否在一分鐘前
    const currentTimestemp = new Date().getTime();
    return (currentTimestemp - lastFetch) / 1000 > 60;
  },
};
