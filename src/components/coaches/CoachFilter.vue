<template>
  <BaseCard>
    <h2>-篩選專長-</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        checked
        @change.prevent="setFilter"
      />
      <label for="frontend">前端工程師</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change.prevent="setFilter" />
      <label for="backend">後端工程師</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change.prevent="setFilter" />
      <label for="career">全端工程師</label>
    </span>
  </BaseCard>
</template>

<!-- <script>
export default {
  emit: ['changeFilter'],
  data() {
    return {
      filters: { frontend: true, backend: true, career: true },
    };
  },
  methods: {
    setFilter(e) {
      const inputId = e.target.id;
      const isChecked = e.target.checked;
      const updatedFilter = {
        ...this.filters,
        [inputId]: isChecked,
      };
      this.filters = updatedFilter;
      //將新結果上傳至list使用呈現
      this.$emit('changeFilter', updatedFilter);
    },
  },
};
</script> -->

<script setup>
import { defineEmits, reactive } from 'vue';
const emit = defineEmits(['changeFilter']);

const filters = reactive({ frontend: true, backend: true, career: true });

const setFilter = (e) => {
  const inputId = e.target.id;
  const isChecked = e.target.checked;
  const updatedFilter = {
    ...filters,
    [inputId]: isChecked,
  };
  const result = Object.assign(filters, updatedFilter);
  //將新結果上傳至list使用呈現
  emit('changeFilter', result);
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
