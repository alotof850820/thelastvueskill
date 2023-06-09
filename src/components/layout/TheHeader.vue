<template>
  <header>
    <nav>
      <h1><RouterLink to="/">連絡吧!</RouterLink></h1>

      <ul>
        <li><RouterLink to="/coaches">所有朋友</RouterLink></li>
        <li v-if="isLoggedIn">
          <RouterLink to="/requests">您的信息</RouterLink>
        </li>
        <li v-else>
          <RouterLink to="/auth">登入</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <BaseButton @click="logout">登出</BaseButton>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => {
  return store.getters.isAuth;
});
const logout = () => {
  store.dispatch('logout');
  router.replace('/coaches');
};
</script>

<!-- <script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
  },
};
</script> -->

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
