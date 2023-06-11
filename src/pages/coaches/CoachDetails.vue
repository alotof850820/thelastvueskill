<template>
  <div>
    <section>
      <BaseCard
        ><h2>{{ fullName }}</h2>
        <h3>${{ rates }}/每小時</h3>
      </BaseCard>
    </section>

    <section>
      <BaseCard>
        <header>
          <h2>對我有興趣嗎~還不快聯絡!</h2>
          <BaseButton link :to="contactLink">聯絡我</BaseButton>
        </header>
        <RouterView></RouterView>
      </BaseCard>
    </section>

    <section>
      <BaseCard>
        <BaseBadge :key="area" v-for="area in areas" :type="area" :title="area">
        </BaseBadge>
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import { useCoachesStore } from '@/store/modules/coaches';

const coachesStore = useCoachesStore();
const props = defineProps(['id']);

const selectedCoach = ref(null);

const fullName = computed(() => {
  return `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`;
});
const contactLink = computed(() => {
  return `/coaches/${props.id}/contact`;
});
const rates = computed(() => {
  return selectedCoach.value.hourlyRate;
});
const description = computed(() => {
  return selectedCoach.value.description;
});
const areas = computed(() => {
  return selectedCoach.value.areas;
});

selectedCoach.value = coachesStore.getCoaches.find(
  (coach) => coach.id === props.id
);
</script>
