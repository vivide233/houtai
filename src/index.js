import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import Vuex from 'vuex'
import routes from './router'
console.log('app', App)
const router = new VueRouter({
    routes
})
Vue.use(VueRouter)
new Vue({
    router,
    components:{
        App
    },
    render: h => h(App)
}).$mount('#app')