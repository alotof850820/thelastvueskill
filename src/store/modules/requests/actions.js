export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message,
    };
    const coachId = payload.coachId;

    //fetch 將req給coach的請求存於coach id中
    const res = await fetch(
      `https://vuejs-1c7fb-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`,
      { method: 'POST', body: JSON.stringify(newRequest) }
    );

    const resData = await res.json();
    if (!res.ok) {
      //error...
      const error = new Error(resData.message) || 'fail to send';
      throw error;
    }

    //不會被發送到server!!!!! 只存在本地
    newRequest.id = resData.name; //name是firebase堤共
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    //只發送給當前活動用戶(自己是教練)得請求 需要全局userId
    const token = context.rootGetters.token;
    const coachId = context.rootGetters.userId;
    const res = await fetch(
      `https://vuejs-1c7fb-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message) || 'fetch fail';
      throw error;
    }

    const requests = [];
    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        userMessage: resData[key].userMessage,
      };
      requests.unshift(request);
    }

    context.commit('setRequests', requests);
  },
};
