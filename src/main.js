import './css/master.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app');