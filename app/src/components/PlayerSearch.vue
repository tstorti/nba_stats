<template>
	<div>
		<div class="search">
			<h3>Player Search</h3>	
			<!-- autofill search input based on all the player names -->
			<basic-select
				:options="options"
                :selected-option="item"
                placeholder="Select Player"
                @select="onSelect">
  			</basic-select>
		</div>
		<div> Results</div>
		<!-- detailed breakdown of player stats with percentiles -->
		<player-detailed :playerdata="cumulative2016" :playerID="item.id"></player-detailed>
		<!-- shot logs for a single player -->
		<shot-logs :teamID="item.team" :playerID="item.id"></shot-logs>
		<!-- side-by-side comparison of two player stats -->
		<player-comparison :playerdata="cumulative2016" :playerID="item.id"></player-comparison>
	</div>
</template>

<script>

//see vue-search-select npm package - used for autofill on user search term
import { BasicSelect } from 'vue-search-select';

//custom components
import PlayerComparison from '@/components/PlayerComparison';
import PlayerDetailed from '@/components/PlayerDetailed';
import GetShotLogs from '@/components/GetShotLogs';

export default {
	name: 'playerSearch',
	props:["playerdata", "playerID"],
	components: {
		"basic-select": BasicSelect,
		"player-comparison": PlayerComparison,
		"player-detailed":PlayerDetailed,
		"shot-logs":GetShotLogs,
    },
    data () {
		return {
			playerCount:0,
			cumulative2016:{},
			options: [],
			searchText:"",
			item:{
				value:"",
				text:""
			}
		}
    },
    
    watch: {
		//once data loads from stats component, display player data
        playerdata: function(){
			this.playerList(this.playerdata);
			this.cumulative2016 = this.playerdata;
        }
    },
    
    methods: {
		playerList(data){
            //need to grab cumulative2016 from other component
            this.playerCount = data.cumulativeplayerstats.playerstatsentry.length;
			
			//set up array of search terms to be used for autocomplete
			for (var i=0;i<this.playerCount;i++){
				var name = data.cumulativeplayerstats.playerstatsentry[i].player.FirstName +" " + data.cumulativeplayerstats.playerstatsentry[i].player.LastName;
				var searchObject = {"id":data.cumulativeplayerstats.playerstatsentry[i].player.ID, "text":name, "team":data.cumulativeplayerstats.playerstatsentry[i].team.Abbreviation};
				this.options.push(searchObject);
			}
			
		},
		onSelect (item) {
			this.item = item
		},
		reset () {
			this.item = {}
		},
		selectOption () {
			// select option from parent component
			this.item = this.options[0]
		}	
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.search{
	width:400px;
	padding:20px;
}

</style>
