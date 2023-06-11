<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred" @close="handleError"
      ><p>{{ error }}</p></BaseDialog
    >
    <BaseDialog title="Auth...." :show="isLoading" fixed>
      <BaseSpinner></BaseSpinner>
    </BaseDialog>

    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!formIsValid">please enter right email and password</p>

        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton @click="switchAuthMode" type="button" mode="flat">{{
          switchModeButtonCation
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('Login');
const isLoading = ref(false);
const error = ref(null);
const route = useRoute();
const router = useRouter();

const submitButtonCaption = computed(() => {
  if (mode.value === 'Login') {
    return 'Login';
  } else {
    return 'Signup';
  }
});
const switchModeButtonCation = computed(() => {
  if (mode.value === 'Signup') {
    return 'Signup instead';
  } else {
    return 'Login instead';
  }
});

const submitForm = async () => {
  formIsValid.value = true;
  if (
    !email.value.includes('@') ||
    email.value === '' ||
    password.value.length < 6
  ) {
    formIsValid.value = false;
    return;
  }
  isLoading.value = true;
  const actionPayload = {
    email: email.value,
    password: password.value,
  };
  try {
    if (mode.value === 'Login') {
      await authStore.login(actionPayload);
    } else {
      await authStore.signup(actionPayload);
    }
    const redirectUrl = '/' + (route.query.redirect || 'coaches');
    router.replace(redirectUrl);
  } catch (error) {
    error.value = error.message || 'failed to auth!!!!';
  }
  isLoading.value = false;
};
const switchAuthMode = () => {
  if (mode.value === 'Login') {
    mode.value = 'Signup';
  } else {
    mode.value = 'Login';
  }
};
const handleError = () => {
  error.value = null;
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
