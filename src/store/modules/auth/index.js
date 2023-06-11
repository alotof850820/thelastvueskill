import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

let timer;

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const userId = ref(null);
  const didAutoLogout = ref(false);

  const getUserId = computed(() => {
    return userId.value;
  });
  const getToken = computed(() => {
    return token.value;
  });
  const isAuth = computed(() => {
    return !!token.value;
  });
  const getDidAutoLogout = computed(() => {
    return didAutoLogout.value;
  });

  const setUser = (payload) => {
    token.value = payload.token;
    userId.value = payload.userId;
    didAutoLogout.value = false;
  };
  const setAutoLogout = () => {
    didAutoLogout.value = true;
  };
  const signup = async (payload) => {
    return auth({ ...payload, mode: 'signup' });
  };
  const login = async (payload) => {
    return auth({ ...payload, mode: 'login' });
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
    setUser({
      token: null,
      userId: null,
    });
  };
  // 用在APP.vue
  const autoLogin = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    //未來到期時間減現在時間 相差多少
    const expiresIn = +tokenExpiration - new Date().getTime();
    //如果小於 xx秒
    if (expiresIn < 0) {
      return;
    }
    //重新設定相差時間
    timer = setTimeout(() => {
      autoLogout();
    }, expiresIn);
    if (token && userId) {
      setUser({
        token: token,
        userId: userId,
      });
    }
  };
  const autoLogout = () => {
    logout();
    setAutoLogout();
  };
  const auth = async (payload) => {
    //套用至login signup
    const mode = payload.mode;
    // 與 signup只有 網址URL 不同
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyAPYVHjI-afqFNeWKifM7OJRBKS7zQtaXc`;
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=

        AIzaSyAPYVHjI-afqFNeWKifM7OJRBKS7zQtaXc`;
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        // firebase rule
        returnSecureToken: true,
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'failed auth');
      throw error;
    }
    ///***** */
    //expiresIn firebase中存的
    //設定幾秒後註銷
    const expiresIn = +resData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      autoLogout();
    }, expiresIn);

    setUser({
      //以下resData規格按firebase rule
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: expirationDate,
    });
  };
  return {
    token,
    userId,
    didAutoLogout,
    getUserId,
    getToken,
    isAuth,
    getDidAutoLogout,
    setUser,
    setAutoLogout,
    signup,
    login,
    logout,
    autoLogin,
    autoLogout,
    auth,
  };
});
