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
import { defineProps, ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
const store = useStore();
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

selectedCoach.value = store.getters['coaches/coaches'].find(
  (coach) => coach.id === props.id
);
</script>

<!-- <script>
export default {
  //透過route將動態props傳進來
  props: ['id'],
  data() {
    return { selectedCoach: null };
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactLink() {
      return `/coaches/${this.id}/contact`;
    },
    rates() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    areas() {
      return this.selectedCoach.areas;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script> -->
