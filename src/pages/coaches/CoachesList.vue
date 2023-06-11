<template>
  <div>
    <BaseDialog :show="!!error" title="errorrrr!!!!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>

    <section>
      <CoachFilter @changeFilter="setFilters"></CoachFilter>
    </section>

    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)"
            >重新整理</BaseButton
          >
          <!-- redirect=register 是自訂參數供 this.$route.query.redirect使用 -->
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn"
            >登入並註冊成為朋友</BaseButton
          >
          <BaseButton
            v-if="!isCoach && !isLoading && isLoggedIn"
            link
            to="/register"
            >註冊成為朋友</BaseButton
          >
        </div>

        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>

        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></CoachItem>
        </ul>
        <h3 v-else>目前無朋友註冊~請您當第一位唷!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import { useCoachesStore } from '@/store/modules/coaches';
import { useAuthStore } from '@/store/modules/auth';

const coachesStore = useCoachesStore();
const authStore = useAuthStore();

const isLoading = ref(false);
const error = ref(null);
const activeFilter = reactive({
  frontend: true,
  backend: true,
  career: true,
});

const isLoggedIn = computed(() => {
  return authStore.isAuth;
});
const filterCoaches = computed(() => {
  const coaches = coachesStore.getCoaches;
  return coaches.filter((coach) => {
    if (activeFilter.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilter.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilter.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});
const hasCoaches = computed(() => {
  return !isLoading.value && coachesStore.hasCoaches;
});
const isCoach = computed(() => {
  return coachesStore.isCoach;
});

const setFilters = (updatedFilter) => {
  activeFilter.frontend = updatedFilter.frontend;
  activeFilter.backend = updatedFilter.backend;
  activeFilter.career = updatedFilter.career;
};
const loadCoaches = async (hasRefresh = false) => {
  isLoading.value = true;
  try {
    await coachesStore.loadCoaches({
      hasRefresh: hasRefresh,
    });
  } catch (e) {
    error.value = e.message || 'something wrong';
  }
  isLoading.value = false;
};
const handleError = () => {
  error.value = null;
};
loadCoaches();
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
