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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const formData = (formDate) => {
  //將新data加入vuex store，用action
  store.dispatch('coaches/registerCoach', formDate);
  router.replace('/coaches');
};
</script>

<!-- <script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: { CoachForm },
  methods: {
    formData(formDate) {
      //將新data加入vuex store，用action
      this.$store.dispatch('coaches/registerCoach', formDate);
      this.$router.replace('/coaches');
    },
  },
};
</script> -->
