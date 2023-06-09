<template>
  <div>
    <BaseDialog :show="!!error" title="An error!!!!!!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>

    <section>
      <BaseCard>
        <header>
          <h2>以下是您的信息</h2>
        </header>

        <BaseSpinner v-if="isLoading"></BaseSpinner>

        <ul v-else-if="hasRequests && !isLoading">
          <RequestsItem
            v-for="request in receivedRequests"
            :email="request.userEmail"
            :message="request.userMessage"
            :id="request.id"
            :key="request.id"
          ></RequestsItem>
        </ul>
        <h3 v-else>您目前還未收到信息唷!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import RequestsItem from '../../components/requests/RequestsItem.vue';
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

const store = useStore();

const isLoading = ref(false);
const error = ref(null);
const receivedRequests = computed(() => {
  return store.getters['requests/requests'];
});
const hasRequests = computed(() => {
  return store.getters['requests/hasRequests'];
});
const loadRequests = async () => {
  isLoading.value = true;
  try {
    await store.dispatch('requests/fetchRequests');
  } catch (error) {
    error.value = error.message || 'somthing failed';
  }

  isLoading.value = false;
};
const handleError = () => {
  error.value = null;
};

loadRequests();
</script>

<!-- <script>
import RequestsItem from '../../components/requests/RequestsItem.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: { RequestsItem },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'somthing failed';
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script> -->

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
