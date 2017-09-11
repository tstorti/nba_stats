import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import GetStats from '@/components/GetStats'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile
		},
		{
			path: '/stats',
			name: 'GetStats',
			component: GetStats
		},
	]
})
