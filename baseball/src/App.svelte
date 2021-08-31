<script>
	import { client } from './deepstream';
	import { ohtani_percentile_store, ohtani_stats_store, page, stored_data, peerInteraction, interaction_store} from './stores.js';
	import { onMount } from 'svelte';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import PitcherReport from './Desktop/PitcherReport.svelte';
	import { windowSize } from './viewStore';
	import html2canvas from "html2canvas";
	import { beforeUpdate, afterUpdate } from 'svelte';

	const urlParams = new URLSearchParams(window.location.search);
    const isVR = urlParams.has('vr');
	const isForm = urlParams.has('form');
	const isDesktop = urlParams.has('desktop');

	let doc;
	let peerDoc;
	if (!isVR){
		doc = "desktop";
		peerDoc = "vr";
	} else {
		doc = "vr";
		peerDoc = "desktop";
	}

	let innerHeight = 0;
	let innerWidth = 0;

	const windowSizeR = client.record.getRecord("windowSize");
	const mousePos = client.record.getRecord("mousePos");

	$: if (isDesktop){
		windowSizeR.set("0", {width: innerWidth, height: innerHeight});
	}


	
	onMount(async () => {
		stored_data.loadData("./OhtaniOneGame.csv");
		ohtani_stats_store.loadData("./OhtaniStats.csv");
		ohtani_percentile_store.loadData("./OhtaniPercentiles.csv");
	})

	let interactionStore;

	

	const unsubscribe_interaction = interaction_store.subscribe(value => {
		interactionStore = value;
	});

	/*
	if(interactionStore.pitcher_store == "pitcher1"){
		
	}*/
	
	//when data is loaded print to console 
	//$: console.log($stored_data);

	//console.log(pitch_trajectory(-0.328,50.000,5.978,1.827,-135.807,-8.338,3.125,28.682,-12.443, 0.001));
	
	function handleMousemove(event) {
		if (isDesktop){
		//mousePos.set("0", {x: event.clientX, y: event.clientY});
		}
	}



	



</script>

	<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>

	<!--<svelte:body on:mousemove={handleMousemove}/>-->

	{#if isDesktop}
			<DesktopEnv interactions={interactionStore} vrMode={false}></DesktopEnv>
	{/if}



	{#if isVR}
		<VirtualEnv></VirtualEnv>
	{/if}

	{#if isForm}
		<PitcherReport></PitcherReport>
	{/if}


