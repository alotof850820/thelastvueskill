<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>$ {{ rates }}/每小時</h4>
    <div>
      <BaseBadge :title="area" :type="area" v-for="area in areas" :key="area">
      </BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="coachContactLink">聯絡我</BaseButton>
      <BaseButton link :to="coachDetailsLink">詳細資訊</BaseButton>
    </div>
  </li>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps(['id', 'firstName', 'lastName', 'rate', 'areas']);

const fullName = computed(() => {
  return `${props.firstName} ${props.lastName}`;
});
const coachContactLink = computed(() => {
  return `${route.path}/${props.id}/contact`;
});
const coachDetailsLink = computed(() => {
  return `${route.path}/${props.id}`;
});
const rates = computed(() => {
  return props.rate;
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
