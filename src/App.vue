<template>
  <TheHeader></TheHeader>
  <RouterView v-slot="slotProps">
    <!-- 要這樣裝則其tem必須只能只有一個root tag -->
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </RouterView>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue';
import { useAuthStore } from '@/store/modules/auth';
import { useRouter } from 'vue-router';
import { computed, watch } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const didAutoLogout = computed(() => {
  return authStore.didAutoLogout;
});

//監視computed變化值,若有自動登出就跳轉到coaches頁面

watch(didAutoLogout, (curState, oldState) => {
  if (curState && curState !== oldState) {
    router.replace('/coaches');
  }
});

authStore.autoLogin();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
