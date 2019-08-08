import Home from './pages/home.vue'
import { Page1 } from './pages/nav1'

export default [
    {
        path: '/', component: Home
    },
    {
        path: '/',
        component: Home,
        name: 'nav1',
        children: [
            { path: '/page1', component: Page1, name: '系统日志' },
        ]
    },
]