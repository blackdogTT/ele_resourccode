import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Bs from 'better-scroll'
import store from './vuex/store'

// Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$bs = Bs;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    data:{
        eventHub:new Vue()
    },
    render: h => h(App)
});
