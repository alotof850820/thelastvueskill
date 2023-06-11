<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">輸入您的信箱:</label>
        <input type="email" id="email" v-model.trim="email" @blur="clear" />
      </div>
      <div>
        <label for="message">輸入您的信息:</label>
        <textarea
          id="message"
          cols="30"
          rows="5"
          v-model.trim="message"
          @blur="clear"
        ></textarea>
        <p v-if="!formIsValid" class="errors">
          請確保信箱含有@以及正確輸入信息
        </p>
      </div>
      <div class="actions">
        <BaseButton>傳送信息</BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRequestsStore } from '@/store/modules/requests';

const router = useRouter();
const route = useRoute();
const requestsStore = useRequestsStore();

const email = ref('');
const message = ref('');
const formIsValid = ref(true);

const clear = () => {
  formIsValid.value = true;
};
const submitForm = () => {
  formIsValid.value = true;
  if (
    email.value === '' ||
    message.value === '' ||
    !email.value.includes('@')
  ) {
    formIsValid.value = false;
    return;
  }
  //傳data給request page
  requestsStore.contactCoach({
    coachId: route.params.id,
    email: email.value,
    message: message.value,
  });
  router.replace('/coaches');
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  margin-top: 0.5rem;
  text-align: center;
}
</style>
