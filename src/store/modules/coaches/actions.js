export default {
  async registerCoach(context, payload) {
    //從register page接收
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      areas: payload.areas,
      hourlyRate: payload.rate,
    };
    //推給mutation使用 and put給後端(firebase 可加token)
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vuejs-1c7fb-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    // const responseData = response.json();
    if (!response.ok) {
      //do something
    }
    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context, payload) {
    //check是否真的該找coach 沒大於一分鐘就不用refetch
    if (!payload.hasRefresh && !context.getters.shouldUpdate) {
      return;
    }

    //send fetch get data and give to mutation
    const response = await fetch(
      `https://vuejs-1c7fb-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );
    const resData = await response.json();
    if (!response.ok) {
      //error....
      const error = new Error(response.message) || 'fetch fail';
      throw error;
    }
    //將物件data轉成array
    const coaches = [];
    for (const coachID in resData) {
      const coach = {
        id: coachID,
        firstName: resData[coachID].firstName,
        lastName: resData[coachID].lastName,
        description: resData[coachID].description,
        areas: resData[coachID].areas,
        hourlyRate: resData[coachID].hourlyRate,
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp'); //存時間點
  },
};
