<script>
	import { ohtani_percentile_store, ohtani_stats_store, page, stored_data, peerInteraction, interaction_store} from './stores.js';
	import { onMount } from 'svelte';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import { pitch_trajectory }  from './pitchCalc.js';
import { validate_component } from 'svelte/internal';
	


	
	onMount(async () => {
		stored_data.loadData("./OhtaniOneGame.csv");
		ohtani_stats_store.loadData("./OhtaniStats.csv");
		ohtani_percentile_store.loadData("./OhtaniPercentiles.csv");
	})


	


	

	/* Example of event listener that updates the data when UpdateData is called from store.js
	document.body.addEventListener('myEvent', (e) => { stored_data.updateStore(e.detail) });
	*/

	document.body.addEventListener('interaction_update', (e) => { peerInteraction.updateData(e.detail) });

	let page_value;
	let interactionStore;

	const unsubscribe_interaction = interaction_store.subscribe(value => {
		interactionStore = value;
	});

	const unsubscribe_page = page.subscribe(value => {
		page_value = value;
	});

	if(interactionStore.pitcher_store == "pitcher1"){
		
	}

	//when data is loaded print to console 
	//$: console.log($stored_data);

	//console.log(pitch_trajectory(-0.328,50.000,5.978,1.827,-135.807,-8.338,3.125,28.682,-12.443, 0.001));


</script>


{#if page_value == 0}

	<DesktopEnv></DesktopEnv>

{/if}


{#if page_value == 1}

	<VirtualEnv></VirtualEnv>

{/if}



