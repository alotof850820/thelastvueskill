<template>
  <div>
    <h1>我的待辦事項</h1>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="deleteItem(index)">刪除</button>
      </li>
    </ul>
    <form @submit.prevent="addItem">
      <label>
        新增待辦事項：
        <input v-model="newItem" type="text" />
      </label>
      <button type="submit">新增</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newItem: '',
    };
  },
  methods: {
    addItem() {
      if (this.newItem) {
        this.items.push(this.newItem);
        this.newItem = '';
      }
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>
