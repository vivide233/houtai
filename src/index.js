import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import Vuex from 'vuex'
import routes from './router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
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