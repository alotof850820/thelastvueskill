let timer;

export default {
  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  // 用在APP.vue
  autoLogin(context) {
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
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },

  async auth(context, payload) {
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
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      //以下resData規格按firebase rule
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: expirationDate,
    });
  },
};
