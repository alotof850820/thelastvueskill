import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthStore } from '../auth/index';

export const useCoachesStore = defineStore('coaches', () => {
  const authStore = useAuthStore();

  const coaches = ref([]);
  const lastFetch = ref(null);

  const getCoaches = computed(() => {
    return coaches.value;
  });
  // 確認是否有data
  const hasCoaches = computed(() => {
    return coaches.value && coaches.value.length > 0;
  });
  const isCoach = computed(() => {
    const coachess = coaches.value;
    const userId = authStore.userId;
    return coachess.some((coach) => coach.id === userId);
  });
  const shouldUpdate = computed(() => {
    const lastFet = lastFetch.value;
    if (!lastFet) {
      return true; //應該更新
    }
    //有時間戳 找出是否在一分鐘前
    const currentTimestemp = new Date().getTime();
    return (currentTimestemp - lastFet) / 1000 > 60;
  });

  const setRegisterCoach = (payload) => {
    coaches.value.unshift(payload);
  };
  const setCoaches = (payload) => {
    //將fetch的data傳至state
    coaches.value = payload;
  };
  const setFetchTimestamp = () => {
    lastFetch.value = new Date().getTime();
  };
  const registerCoach = async (payload) => {
    //從register page接收
    const userId = authStore.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      areas: payload.areas,
      hourlyRate: payload.rate,
    };
    //推給mutation使用 and put給後端(firebase 可加token)
    const token = authStore.token;
    const response = await fetch(
      `https://vuejs-1c7fb-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    if (!response.ok) {
      throw new Error('fetch fail');
    }
    setRegisterCoach({ ...coachData, id: userId });
  };
  const loadCoaches = async (payload) => {
    //check是否真的該找coach 沒大於一分鐘就不用refetch
    if (!payload.hasRefresh && !shouldUpdate.value) {
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
    setCoaches(coaches);
    setFetchTimestamp(); //存時間點
  };
  return {
    coaches,
    lastFetch,
    getCoaches,
    hasCoaches,
    isCoach,
    shouldUpdate,
    setRegisterCoach,
    registerCoach,
    setCoaches,
    setFetchTimestamp,
    loadCoaches,
  };
});
