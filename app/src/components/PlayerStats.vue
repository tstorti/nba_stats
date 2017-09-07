<template>
	<div>
		<h1>{{ msg }}</h1>
	</div>
</template>

<script>

var axios = require("axios");

export default {
	name: 'playerData',
	data () {
		return {
			playerData:{},
			msg:"Stats Component"
		}
	},
	created() {
		this.fetchData()
    },

    watch: {
		'$route': 'fetchData'
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
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
