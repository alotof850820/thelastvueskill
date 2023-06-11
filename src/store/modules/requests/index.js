import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthStore } from '../auth/index';

export const useRequestsStore = defineStore('requests', () => {
  const authStore = useAuthStore();

  const requests = ref([]);

  const getRequests = computed(() => {
    //需篩選出coachid的req
    const coachId = authStore.userId;
    return requests.value.filter((coach) => coach.coachId === coachId);
  });
  const hasRequests = computed(() => {
    return getRequests.value && getRequests.value.length > 0;
  });

  const addRequest = (payload) => {
    return requests.value.unshift(payload);
  };
  const setRequests = (payload) => {
    return (requests.value = payload);
  };

  const contactCoach = async (payload) => {
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
    addRequest(newRequest);
  };
  const fetchRequests = async () => {
    //只發送給當前活動用戶(自己是教練)得請求 需要全局userId
    const token = authStore.token;
    const coachId = authStore.userId;
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
    setRequests(requests);
  };
  return {
    requests,
    getRequests,
    hasRequests,
    addRequest,
    setRequests,
    contactCoach,
    fetchRequests,
  };
});
