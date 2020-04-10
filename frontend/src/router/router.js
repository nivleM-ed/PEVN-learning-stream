import Login from '@/pages/Login.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
    {
        path: '/', //localhost:8080/
        redirect: '/login'
    },
    {
        path: '/vuetify_test',
        component: HelloWorld
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    { path: '*', component: NotFound }
]

export default routes;