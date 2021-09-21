<script>
	import { client } from './deepstream';
	import { ohtani_percentile_store, ohtani_stats_store, page, stored_data, peerInteraction, interaction_store} from './stores.js';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import PitcherReport from './Desktop/PitcherReport.svelte';
	import { onMount, afterUpdate, tick } from 'svelte';
	import { desktopScreenRecord, screenRecord } from './viewStore';

	let urlParams; 
  let isVR;
	let isForm;
	let isDesktop; 
	let video;
	let canvas;

	let sharing = false;

	function handleSuccess(stream) {
			sharing = true;
			window.stream = stream; // make stream available to browser console
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



	onMount(async () => {

		urlParams = new URLSearchParams(window.location.search);
	
		isVR = urlParams.has('vr');
		isForm = urlParams.has('form');
		isDesktop = urlParams.has('desktop');

		if(isDesktop){
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
		}

		stored_data.loadData("./OhtaniOneGame.csv");
		ohtani_stats_store.loadData("./OhtaniStats.csv");
		ohtani_percentile_store.loadData("./OhtaniPercentiles.csv");
	})


	let screenStore;

	const unsubscribe_screen = screenRecord.subscribe(value => {
		screenStore = value;
	});

	async function screenCapture(){
    await tick();
    canvas.width = innerWidth;
			canvas.height = innerHeight;
			canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(function(blob){ 
				let url = URL.createObjectURL(blob);
				let oldURL = screenStore;
				console.log("old", oldURL);
				console.log("new", url);
				desktopScreenRecord.set("0", url);
				URL.revokeObjectURL(oldURL);
			});
  }
	

  afterUpdate(() => {
		if(sharing){
			screenCapture()
		}
  });

	let innerHeight = 0;
	let innerWidth = 0;

	const windowSizeR = client.record.getRecord("windowSize");
	const mousePos = client.record.getRecord("mousePos");

	$: if (isDesktop){
		windowSizeR.set("0", {width: innerWidth, height: innerHeight});
	}

	let interactionStore;

	const unsubscribe_interaction = interaction_store.subscribe(value => {
		interactionStore = value;
	});


	
	function handleMousemove(event) {
		if (isDesktop){
		//mousePos.set("0", {x: event.clientX, y: event.clientY});
		}
	}

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


