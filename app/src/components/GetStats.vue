<template>
	<div>
		<!-- pass the msg and data from api call to the RandomPlayer component -->
		<random :message="msg" :playerdata="cumulative2016"></random>
		<!-- pass the msg and data from api call to the RandomPlayer component -->
		<search :playerdata="cumulative2016"></search>
	</div>
</template>

<script>

import RandomPlayer from '@/components/RandomPlayer';
import PlayerSearch from '@/components/PlayerSearch';

var axios = require("axios");

export default {	
	name: 'GetStats',
	components: {
		'random': RandomPlayer,
		"search": PlayerSearch,
	},

	data () {
		return {
			cumulative2016:{},
			msg:"Stats Component"
		}
	},
	//run fetchData method on page load
	created() {
		this.fetchData()
    },
	methods: {
		fetchData() {
			var url = "https://api.mysportsfeeds.com/v1.1/pull/nba/2016-2017-regular/cumulative_player_stats.json";
			var user = "";
			var password = "";
			var key = btoa(user+":"+password);
			axios({
				method:'get',
				url: url,
				headers:{
					"Authorization": "Basic "+ key
				},
			})
			.then((res) => {
				this.cumulative2016=res.data;
			})
			.catch((err) => {
				console.log(err)
			})
		},
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
