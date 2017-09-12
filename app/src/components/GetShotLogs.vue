<template>
	<div>
		<shot-chart :madeShots="madeShots" :missedShots="missedShots"></shot-chart>
	</div>
</template>

<script>

var axios = require("axios");

import PlayerShotChart from '@/components/PlayerShotChart';

export default {	
	name: 'GetStats',
	components: {
		"shot-chart":PlayerShotChart
	},
	props:["playerID", "teamID"],
	data () {
		return {
			teamGames:[],
			madeShots:[],
			missedShots:[],
			msg:"Stats Component"
		}
	},
	watch: {
		//once data loads from stats component, display player data
        teamID: function(){
			this.fetchGameSchedule(this.teamID);
        }
    },
	methods: {
		fetchGameSchedule(teamID) {

			var url = "https://api.mysportsfeeds.com/v1.1/pull/nba/2016-2017-regular/full_game_schedule.json?team="+teamID;
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
				//result - array of games team games
				var schedule = res.data.fullgameschedule.gameentry;
				//console.log(schedule);
				//add last 5 game entries - each has to be made ajax call (approx 6 KB) so need to limit game records
				for(var i=0;i<5;i++){
					var date = schedule[i].date.split("-").join("");
					var home = schedule[i].homeTeam.Abbreviation;
					var away = schedule[i].awayTeam.Abbreviation;
					var game = date + "-"+away+"-"+home;
					console.log(game);
					//add each game need to check format of json response
					this.teamGames.push(game);
				}
				this.fetchGameLogs(this.teamGames, 0);
				
			})
			.catch((err) => {
				console.log(err)
			})
		},
		fetchGameLogs(gamesArray, gameNumber) {
			//gameID is in format YYYYMMDD-TeamID-TeamID where TeamID is the 3 letter abbreviation
			if(gameNumber <5){
				var url = "https://api.mysportsfeeds.com/v1.1/pull/nba/2016-2017-regular/game_playbyplay.json?gameid="+gamesArray[gameNumber]+"&playtype=field-goal";
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
					//result
					var gameLog = res.data.gameplaybyplay.plays.play;
					console.log(gameLog);
					console.log(this.playerID);

					//push all the shot data into playerShots array - need to filter by the playerID number
					for(var i=0;i<gameLog.length;i++){
						var shootingPlayer = gameLog[i].fieldGoalAttempt.shootingPlayer.ID;
						var outcome = gameLog[i].fieldGoalAttempt.outcome;
						
						//TODO - need to set the x and y coordinates for the shots logs
						var xCoord = "";
						var yCoord = "";

						if(this.playerID === shootingPlayer && outcome === "MISSED"){
							var missedShot = {"x": xCoord, "y": yCoord};
							this.missedShots.push(missedShot);
						}
						else if(this.playerID === shootingPlayer && outcome === "SCORED"){
							var madeShot = {"x": xCoord, "y": yCoord};
							this.madeShots.push(madeShot);
						}
					}
					//get the shot logs for the next game (will shot getting data after X calls are made)
					this.fetchGameLogs(gamesArray, gameNumber+1);
				})
				.catch((err) => {
					console.log(err)
				})
			}
			
		},
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
