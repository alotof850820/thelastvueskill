<!-- <script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,

      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: { CoachItem, CoachFilter },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    filterCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },

    hasCoaches() {
      //檢查
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  methods: {
    setFilters(updatedFilter) {
      //activeFilter與子component updatedFilter狀態保持一致
      this.activeFilter = updatedFilter;
    },
    async loadCoaches(hasRefresh = false) {
      this.isLoading = true;
      //等待fetch完成
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          hasRefresh: hasRefresh,
        });
      } catch (error) {
        this.error = error.message || 'something wrong';
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script> -->

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
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

const store = useStore();

const isLoading = ref(false);
const error = ref(null);
const activeFilter = reactive({
  frontend: true,
  backend: true,
  career: true,
});

const isLoggedIn = computed(() => {
  return store.getters.isAuth;
});

const filterCoaches = computed(() => {
  const coaches = store.getters['coaches/coaches'];
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
  return !isLoading.value && store.getters['coaches/hasCoaches'];
});

const isCoach = computed(() => {
  return store.getters['coaches/isCoach'];
});

const setFilters = (updatedFilter) => {
  activeFilter.frontend = updatedFilter.frontend;
  activeFilter.backend = updatedFilter.backend;
  activeFilter.career = updatedFilter.career;
};

const loadCoaches = async (hasRefresh = false) => {
  isLoading.value = true;
  try {
    await store.dispatch('coaches/loadCoaches', {
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

<!-- <script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  setup() {
    const store = useStore();

    const isLoading = ref(false);
    const error = ref(null);
    const activeFilter = reactive({
      frontend: true,
      backend: true,
      career: true,
    });

    const isLoggedIn = computed(() => {
      return store.getters.isAuth;
    });

    const filterCoaches = computed(() => {
      const coaches = store.getters['coaches/coaches'];
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
      return !isLoading.value && store.getters['coaches/hasCoaches'];
    });

    const isCoach = computed(() => {
      return store.getters['coaches/isCoach'];
    });

    const setFilters = (updatedFilter) => {
      activeFilter.frontend = updatedFilter.frontend;
      activeFilter.backend = updatedFilter.backend;
      activeFilter.career = updatedFilter.career;
    };

    const loadCoaches = async (hasRefresh = false) => {
      isLoading.value = true;
      try {
        await store.dispatch('coaches/loadCoaches', {
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

    return {
      isLoading,
      error,
      activeFilter,
      isLoggedIn,
      filterCoaches,
      hasCoaches,
      isCoach,
      setFilters,
      loadCoaches,
      handleError,
    };
  },
};
</script> -->

<!-- <script setup>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore;

const isLoading = ref(false);
const error = ref(null);
const activeFilter = reactive({ frontend: true, backend: true, career: true });
const isLoggedIn = computed(() => {
  return store.getters.isAuth;
});
const filterCoaches = computed(() => {
  const coaches = store.getters['coaches/coaches'];
  return coaches.filter((coach) => {
    if (activeFilter.value.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilter.value.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilter.value.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});

const hasCoaches = computed(() => {
  //檢查
  return !isLoading.value && store.getters['coaches/hasCoaches'];
});

const isCoach = computed(() => {
  return store.getters['coaches/isCoach'];
});

const setFilters = (updatedFilter) => {
  //activeFilter與子component updatedFilter狀態保持一致
  activeFilter.value = updatedFilter;
};

const loadCoaches = async (hasRefresh = false) => {
  isLoading.value = true;
  //等待fetch完成
  try {
    await store.dispatch('coaches/loadCoaches', {
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
</script> -->

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
