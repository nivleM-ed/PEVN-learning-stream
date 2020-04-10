import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router';
import routes from './router/router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
