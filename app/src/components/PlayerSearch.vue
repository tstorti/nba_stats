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
		<player-comparison :playerdata="cumulative2016" :playerID="item.id"></player-comparison>
	</div>
</template>

<script>

//see vue-search-select npm package
import { BasicSelect } from 'vue-search-select';

import PlayerComparison from '@/components/PlayerComparison';

export default {
	name: 'playerSearch',
	props:["playerdata", "playerID"],
	components: {
		"basic-select": BasicSelect,
		"player-comparison": PlayerComparison,
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
    //once data loads from stats component, display player data
    watch: {
        playerdata :function(){
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
				var searchObject = {"id":data.cumulativeplayerstats.playerstatsentry[i].player.ID, "text":name};
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
