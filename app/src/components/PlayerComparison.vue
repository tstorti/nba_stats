<template>
	<div>
		<div>
			<button v-on:click="displayPlayer(playerdata, playerID, 0)">Add Player 1</button>
			<button v-on:click="displayPlayer(playerdata, playerID, 1)">Add Player 2</button>
		</div>
		<div class="random">
			<div>Player1</div>
			<div>Stats for: {{players[0].lastName}},{{players[0].firstName}}</div>
			<div>{{players[0].position}} for {{players[0].team}}</div>
			<div>Games Played {{players[0].gamesPlayed}}</div>
			<div>PPG {{players[0].pointsPerGame}}</div>
			<div>Overall +/- {{players[0].plusMinus}}</div>
		</div>
		<div class="random">
			<div>Player2</div>
			<div>Stats for: {{players[1].lastName}},{{players[1].firstName}}</div>
			<div>{{players[1].position}} for {{players[1].team}}</div>
			<div>Games Played {{players[1].gamesPlayed}}</div>
			<div>PPG {{players[1].pointsPerGame}}</div>
			<div>Overall +/- {{players[1].plusMinus}}</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'playerComparison',
	props:["playerdata", "playerID"],
    data () {
		return {
			players : [
				{
					firstName:"",
					lastName:"",
					position:"",
					team:"",
					gamesPlayed:"",
					pointsPerGame:"",
					plusMinus:"",
				},
				{
					firstName:"",
					lastName:"",
					position:"",
					team:"",
					gamesPlayed:"",
					pointsPerGame:"",
					plusMinus:"",
				}
			]
		}
    },
    methods: {
		displayPlayer(data, id, playerNum){
			for(var i=0;i<data.cumulativeplayerstats.playerstatsentry.length;i++){
				//console.log(data.cumulativeplayerstats.playerstatsentry[i].player.ID);
				if (data.cumulativeplayerstats.playerstatsentry[i].player.ID == id){
					// //set data points to be displayed:
					this.players[playerNum].firstName = data.cumulativeplayerstats.playerstatsentry[i].player.FirstName;
					this.players[playerNum].lastName = data.cumulativeplayerstats.playerstatsentry[i].player.LastName;
					this.players[playerNum].position = data.cumulativeplayerstats.playerstatsentry[i].player.Position;
					this.players[playerNum].team = data.cumulativeplayerstats.playerstatsentry[i].team.Name;
					this.players[playerNum].gamesPlayed = data.cumulativeplayerstats.playerstatsentry[i].stats.GamesPlayed["#text"];
					this.players[playerNum].pointsPerGame = data.cumulativeplayerstats.playerstatsentry[i].stats.PtsPerGame["#text"];
					this.players[playerNum].plusMinus = data.cumulativeplayerstats.playerstatsentry[i].stats.PlusMinus["#text"];
				}
			}
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.random{
	width:300px;
	padding:20px;
	margin:10px;
	border: 2px solid black;
	border-radius: 10px;
}

</style>
