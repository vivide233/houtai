import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
const router = VueRouter({
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