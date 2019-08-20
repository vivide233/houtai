import Home from './pages/home.vue'
import { Page1 } from './pages/nav1/index.js'
console.log('page1', Page1)
export default [
    {
        path: '/', component: Home
    },
    {
        path: '/',
        component: Home,
        name: 'page1',
        iconCls: 'el-icon-menu',
        children: [
            { path: 'page1', component: Page1, name: '系统日志' },
        ]
    },
]