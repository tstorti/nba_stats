import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import PlayerStats from '@/components/PlayerStats'
import RandomPlayer from '@/components/RandomPlayer'

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
			path: '/playerstats',
			name: 'PlayerStats',
			component: PlayerStats
		},
	]
})
