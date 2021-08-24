<script>
	import { ohtani_percentile_store, ohtani_stats_store, page, stored_data, peerInteraction, interaction_store, mousePosition, updateMousePos, cameraPosition} from './stores.js';
	import { onMount } from 'svelte';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import PitcherReport from './Desktop/PitcherReport.svelte';
	

	const urlParams = new URLSearchParams(window.location.search);
    const isVR = urlParams.has('vr');
	const isForm = urlParams.has('form');
	const isDesktop = urlParams.has('desktop');

	onMount(async () => {
		stored_data.loadData("./OhtaniOneGame.csv");
		ohtani_stats_store.loadData("./OhtaniStats.csv");
		ohtani_percentile_store.loadData("./OhtaniPercentiles.csv");
	})

	function handleMousemove(event) {
		updateMousePos([event.clientX, event.clientY]);
	}


	let page_value;
	let interactionStore;
	let innerWidth;
	let innerHeight;

	const unsubscribe_interaction = interaction_store.subscribe(value => {
		interactionStore = value;
	});

	const unsubscribe_page = page.subscribe(value => {
		page_value = value;
	});

	if(interactionStore.pitcher_store == "pitcher1"){
		
	}

	interaction_store.updateWindowSize([window.innerWidth, window.innerHeight]);
	
	//when data is loaded print to console 
	//$: console.log($stored_data);

	//console.log(pitch_trajectory(-0.328,50.000,5.978,1.827,-135.807,-8.338,3.125,28.682,-12.443, 0.001));


</script>


	{#if isDesktop}
		<DesktopEnv interactions={interactionStore} vrMode={false}></DesktopEnv>
	{/if}


	{#if isVR}
		<VirtualEnv></VirtualEnv>
	{/if}

	{#if isForm}
		<PitcherReport></PitcherReport>
	{/if}


