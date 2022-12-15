/* eslint-disable */
import { createApp, type Component } from 'vue';
// import FirebasePlugin from '@/plugins/firebase';
import UIComponents from 'UI/components';
import Ripple from 'UI/directives/ripple';
import ClickOutside from 'UI/directives/clickOutside';
// import 'UI/styles';

import App from './App.vue';
import router from './router';

import '@/assets/styles/reset.scss';

const app = createApp(App);

UIComponents.forEach((UIComponent: Component): void => {
  if (UIComponent.name) {
    app.component(UIComponent.name, UIComponent);
  }
});

app.use(router);
// app.use(FirebasePlugin);

app.directive('ripple', Ripple);
app.directive('closable', ClickOutside);

app.mount('#app');
