<template>
  <div>
    <section>
      <BaseCard>
        <h2>註冊成為朋友吧!</h2>
        <CoachForm @formData="formData"></CoachForm>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import CoachForm from '../../components/coaches/CoachForm.vue';
import { useCoachesStore } from '@/store/modules/coaches';
import { useRouter } from 'vue-router';
const coachesStore = useCoachesStore();
const router = useRouter();

const formData = (formDate) => {
  //將新data加入vuex store，用action
  coachesStore.registerCoach(formDate);
  router.replace('/coaches');
};
</script>
