import Home from './pages/home.vue'
import NotFound from './pages/404.vue'
import { Page1 } from './pages/nav1/index.js'
console.log('page1', Page1)
export default [
    {
        path: '/',
        component: Home,
        name: 'page1',
        iconCls: 'el-icon-menu',
        children: [
            { path: 'page1', component: Page1, name: '系统日志' },
        ]
    },
    {
        path: '/', 
        component: Home,
        children: [
            {
                path: '*',
                component: NotFound,
            }
        ]
    },
]