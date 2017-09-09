<template>
	<div>
		<h3>Player Search</h3>
		<div>
			<!-- <input type="text" id="search">
			<div>There are {{playerCount}} players</div> -->
			<basic-select :options="options"
                :selected-option="item"
                placeholder="select item"
                @select="onSelect">
  			</basic-select>
		</div>
	</div>
</template>

<script>

//see vue-search-select npm package
import { BasicSelect } from 'vue-search-select';

export default {
	name: 'playerSearch',
	props:["playerdata"],
	components: {
		BasicSelect
    },
    data () {
		return {
			playerCount:0,
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
        }  
    },
    
    methods: {
		playerList(data){
            //need to grab cumulative2016 from other component
            this.playerCount = data.cumulativeplayerstats.playerstatsentry.length;
			
			//set up array of search terms to be used for autocomplete
			for (var i=0;i<this.playerCount;i++){
				var name = data.cumulativeplayerstats.playerstatsentry[i].player.FirstName +" " + data.cumulativeplayerstats.playerstatsentry[i].player.LastName;
				var searchObject = {"id":i, "text":name};
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

</style>
