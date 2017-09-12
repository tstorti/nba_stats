<template>
	<div>
		<div>
			<div>Player Stats - Detailed</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'playerDetailed',
	props:["playerdata", "playerID"],
    data () {
		return {
			firstName:"",
			lastName:"",
			position:"",
			team:"",
			gamesPlayed:{
				"raw": "",
				"percentile":""
			},
			pointsPerGame:{
				"raw": "",
				"percentile":""
			},
			plusMinus:{
				"raw": "",
				"percentile":""
			},
			// trueShooting:{
			// 	"raw": "",
			// 	"percentile":""
			// },
		}
    },
    methods: {
		statDistributions(data, id){
			//create sorted array for each stat with playerID, rawStat keys - then do indexOf to get player position

			//stats to show:

			//ppg

			//rpg

			//blks per game

			//steals per game
			
			//3pt percentage

			//2pt percentage

			//true shooting percentage

		},
		displayPlayer(data, id){
			for(var i=0;i<data.cumulativeplayerstats.playerstatsentry.length;i++){
				//console.log(data.cumulativeplayerstats.playerstatsentry[i].player.ID);
				if (data.cumulativeplayerstats.playerstatsentry[i].player.ID == id){
					// //set data points to be displayed:
					this.players.firstName = data.cumulativeplayerstats.playerstatsentry[i].player.FirstName;
					this.players.lastName = data.cumulativeplayerstats.playerstatsentry[i].player.LastName;
					this.players.position = data.cumulativeplayerstats.playerstatsentry[i].player.Position;
					this.players.team = data.cumulativeplayerstats.playerstatsentry[i].team.Name;
					this.players.gamesPlayed.raw = data.cumulativeplayerstats.playerstatsentry[i].stats.GamesPlayed["#text"];
					this.players.pointsPerGame.raw = data.cumulativeplayerstats.playerstatsentry[i].stats.PtsPerGame["#text"];
					this.players.plusMinus.raw = data.cumulativeplayerstats.playerstatsentry[i].stats.PlusMinus["#text"];
				}
			}
		},
		historicData(){
			//do YOY stat comparison for player
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
