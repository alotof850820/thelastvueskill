export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false; //確保再次登入時會更改，觸發watcher
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
