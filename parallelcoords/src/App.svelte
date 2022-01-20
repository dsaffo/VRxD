<script>
	import { desktopConnection, vrConnection } from "./peer";
	import { client} from './deepstream';
	import { onMount } from 'svelte';
	import { stats_store, interaction_store} from './stores.js';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	

	let urlParams; 
  let isVR;
	let isForm;
	let isDesktop; 
	let video;

	let innerHeight = 1080;
	let innerWidth = 1920;

	let sharing = false;
	
	function handleSuccess(stream) {
			sharing = true;
			window.stream = stream; // make stream available to browser console
			video.srcObject = stream;
			desktopConnection(stream);
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
			if (typeof(RTCIceGatherer) !== "undefined"){
				navigator.getDisplayMedia(edge_constraints).
				then(handleSuccess).catch(handleError);
					} else if (typeof(navigator.mediaDevices.getDisplayMedia) !== "undefined"){
				navigator.mediaDevices.getDisplayMedia(edge_constraints).then(handleSuccess).catch(handleError); 
			} else {
				navigator.mediaDevices.getUserMedia(ff_constraints).
				then(handleSuccess).catch(handleError);
			}	
		} else {
			vrConnection();
		}

		stats_store.loadData("./topbottom25.csv");
	})
	

	const windowSizeR = client.record.getRecord("windowSize");
	//const mousePos = client.record.getRecord("mousePos");

	$: if (isDesktop){
		windowSizeR.set("0", {width: innerWidth, height: innerHeight});
	}

	let interactionStore;

	const unsubscribe_interaction = interaction_store.subscribe(value => {
		interactionStore = value;
	});


	
	let m = { x: 0, y: 0 };
	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	//$: interactionStore && screenCapture();

	</script>

	<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>

	<!--<svelte:body on:mousemove={handleMousemove}></svelte:body>-->

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
		<!--<PitcherReport></PitcherReport>-->
		<!-- svelte-ignore a11y-media-has-caption -->
		<video playsinline autoplay id="video"></video>
	{/if}

