import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Instagram from '../components/Instagram.vue'
import Youtube from '../components/Youtube.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/instagram',
    name: 'Instagram',
    component: Instagram
  },
  {
    path: '/youtube',
    name: 'Youtube',
    component: Youtube
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
	meta: { authRequired: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
	Store.dispatch('INIT_AUTH')
	.then(user => {
		if (to.matched.some(route => route.meta.authRequired)) {
			if (user) next()
			else next('/login')
		} else {
			next()
		}
	})
})

export default router