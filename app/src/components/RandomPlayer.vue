<template>
	<div>
		<h1>{{message}}</h1>
        <h3>{{ header }}</h3>
		<div>
			<div>Stats for: {{lastName}},{{firstName}}</div>
			<div>{{position}} for {{team}}</div>
			<div>Games Played {{gamesPlayed}}</div>
			<div>PPG {{pointsPerGame}}</div>
			<div>Overall +/- {{plusMinus}}</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'randomPlayer',
	props:["playerdata", "message"],
    data () {
		return {
			playerCount:0,
			firstName:"",
			lastName:"",
			position:"",
			team:"",
			gamesPlayed:"",
			pointsPerGame:"",
			plusMinus:"",
            header:"Random Player Stats",
		}
    },
    //once data loads from stats component, display player data
    watch: {
        playerdata :function(){
            this.randomPlayer(this.playerdata);
        }  
    },
    
    methods: {
		randomPlayer(data){
            //need to grab cumulative2016 from other component
            this.playerCount = data.cumulativeplayerstats.playerstatsentry.length;

            //choose random player
			var index = Math.floor(Math.random()*this.playerCount);
			var randomData = data.cumulativeplayerstats.playerstatsentry[index];
			
            //set data points to be displayed:
			this.firstName = randomData.player.FirstName;
			this.lastName = randomData.player.LastName;
			this.position = randomData.player.Position;
			this.team = randomData.team.Name;
			this.gamesPlayed = randomData.stats.GamesPlayed["#text"];
			this.pointsPerGame = randomData.stats.PtsPerGame["#text"];
			this.plusMinus = randomData.stats.PlusMinus["#text"];
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
