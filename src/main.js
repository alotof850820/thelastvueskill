import { createApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/ui/BaseDialog.vue')
);

const app = createApp(App);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseBadge', BaseBadge);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);

app.use(createPinia());
app.use(router);

app.mount('#app');
