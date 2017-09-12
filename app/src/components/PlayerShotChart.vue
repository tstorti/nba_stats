<template>
	<div>

	</div>
</template>

<script>

export default {
	name: 'playerShotChart',
	props:["madeShots", "missedShots"],
    data () {
		return {
			//define variable for each of the shot zones for percentage chart
		}
    },
    methods: {
		displayMade(shots){
			//grab array of shots that were made by player and plot on scatter chart as data series
			console.log("missed shots: ");
			console.log(this.missedShots);
			console.log("made shots");
			console.log(this.madeShots);
		},
		displayMissed(shots){
			//grab array of shots that were missed by player and plot on scatter chart as data series
		},
		percentageChart(shots){
			//display chart by zone with FG % (made / (made+missed))
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
