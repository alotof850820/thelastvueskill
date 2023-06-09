export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuth(state) {
    //有token
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
