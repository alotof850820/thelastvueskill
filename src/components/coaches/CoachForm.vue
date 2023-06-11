<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">姓:</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity(firstName)"
      />
      <p v-if="!firstName.isValid">姓不能空白</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="LastName">名:</label>
      <input
        type="text"
        id="LastName"
        v-model.trim="lastName.val"
        @blur="clearValidity(lastName)"
      />
      <p v-if="!lastName.isValid">名不能空白</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description ">自我介紹</label>
      <textarea
        v-model.trim="description.val"
        id="description "
        rows="5"
        @blur="clearValidity(description)"
      ></textarea>
      <p v-if="!description.isValid">介紹不能空白</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="Rate">費用</label>
      <input
        v-model.number="rate.val"
        type="number"
        id="Rate"
        @blur="clearValidity(rate)"
      />
      <p v-if="!rate.isValid">費用不能小於0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>專長</h3>
      <div>
        <input
          v-model="areas.val"
          type="checkbox"
          id="frontend"
          value="frontend"
          @blur="clearValidity(areas)"
        />
        <label for="frontend"> 前端工程師</label>
      </div>
      <div>
        <input
          v-model="areas.val"
          type="checkbox"
          id="backend"
          value="backend"
          @blur="clearValidity(areas)"
        />
        <label for="backend"> 後端工程師</label>
      </div>
      <div>
        <input
          v-model="areas.val"
          type="checkbox"
          id="career"
          value="career"
          @blur="clearValidity(areas)"
        />
        <label for="career"> 全端工程師</label>
      </div>
      <p v-if="!areas.isValid">請選擇一個專長</p>
    </div>
    <p v-if="!formIsValid">請正確填寫表單!</p>
    <BaseButton>註冊</BaseButton>
  </form>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['formData']);
const router = useRouter();

const firstName = reactive({
  val: '',
  isValid: true,
});
const lastName = reactive({
  val: '',
  isValid: true,
});
const description = reactive({
  val: '',
  isValid: true,
});
const rate = reactive({
  val: null,
  isValid: true,
});
const areas = reactive({
  val: [],
  isValid: true,
});
const formIsValid = ref(true);

const clearValidity = (input) => {
  input.isValid = true;
};
const validateForm = () => {
  formIsValid.value = true;

  if (firstName.val === '') {
    firstName.isValid = false;
    formIsValid.value = false;
  }
  if (lastName.val === '') {
    lastName.isValid = false;
    formIsValid.value = false;
  }
  if (description.val === '') {
    description.isValid = false;
    formIsValid.value = false;
  }
  if (!rate.val || rate.val < 0) {
    rate.isValid = false;
    formIsValid.value = false;
  }
  if (areas.val.length === 0) {
    areas.isValid = false;
    formIsValid.value = false;
  }
};
const submitForm = () => {
  validateForm();
  if (!formIsValid.value) {
    return;
  }
  const formData = {
    first: firstName.val,
    last: lastName.val,
    desc: description.val,
    rate: rate.val,
    areas: areas.val,
  };
  emit('formData', formData);
  router.replace('/');
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
