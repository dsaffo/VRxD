<script>
	import { client } from './deepstream';
	import { ohtani_percentile_store, ohtani_stats_store, page, stored_data, peerInteraction, interaction_store} from './stores.js';
	import { onMount } from 'svelte';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import PitcherReport from './Desktop/PitcherReport.svelte';
	import { windowSize } from './viewStore';
	import html2canvas from "html2canvas";
	import { beforeUpdate, afterUpdate, tick } from 'svelte';
import { async } from 'aframe';

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


	


	function handleSuccess(stream) {
		//window.stream = stream; // make stream available to browser console
		video.srcObject = stream
	}

	function handleError(error) {
		console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
	}

			var edge_constraints = {
		video: true
		};

		var ff_constraints = {
		video: {
			mediaSource: "window"
			},
		};

	let video;
	let canvas;
	onMount(async () => {
		video = document.querySelector('video');
		canvas = document.createElement("canvas");
		if (typeof(RTCIceGatherer) !== "undefined"){
			navigator.getDisplayMedia(edge_constraints).
			then(handleSuccess).catch(handleError);
      	} else if (typeof(navigator.mediaDevices.getDisplayMedia) !== "undefined"){
			navigator.mediaDevices.getDisplayMedia(edge_constraints).then(handleSuccess).catch(handleError); 
		} else {
			navigator.mediaDevices.getUserMedia(ff_constraints).
			then(handleSuccess).catch(handleError);
		}	

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


	async function screenCapture(){

		await tick();
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		const frame = canvas.toDataURL('image/jpeg', 0.5);
		console.log(frame);

	}

	afterUpdate(() => {
		screenCapture()
	});

	


</script>

	<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>

	<!-- svelte-ignore a11y-media-has-caption -->
	<video style="display: none" playsinline autoplay></video>

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


