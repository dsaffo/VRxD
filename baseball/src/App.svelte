<script>
	import { client} from './deepstream';
	import { ohtani_percentile_store, ohtani_stats_store, page, stored_data, peerInteraction, interaction_store} from './stores.js';
	import VirtualEnv from './VR/VirtualEnv.svelte';
	import DesktopEnv from './Desktop/DesktopEnv.svelte';
	import PitcherReport from './Desktop/PitcherReport.svelte';
	import { onMount, afterUpdate, beforeUpdate,tick } from 'svelte';
	import { desktopScreenRecord, screenRecord } from './viewStore';
	import Peer from 'peerjs';
	

	let urlParams; 
  let isVR;
	let isForm;
	let isDesktop; 
	let video;
	let canvas;
	let peer;
	let peerID;
	let conn;

	let innerHeight = 1080;
	let innerWidth = 1920;

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


	let peerOptions = {
  config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' },
    { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  ]} /* Sample servers, please use appropriate ones */}


	onMount(async () => {

		urlParams = new URLSearchParams(window.location.search);
	
		isVR = urlParams.has('vr');
		isForm = urlParams.has('form');
		isDesktop = urlParams.has('desktop');


		
		if (isVR){
			peerID = 'vrxdDesktop'
			peer = new Peer('vrxdVR'); 
		} else {
			peerID = 'vrxdVR'
			peer = new Peer('vrxdDesktop'); 
		}

		conn = peer.connect(peerID);

		
		

		

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


	//let screenStore;

	//const unsubscribe_screen = screenRecord.subscribe(value => {
	//	screenStore = value;
	//});

	/*
	async function screenCapture(){
    canvas.width = innerWidth;
		canvas.height = innerHeight;
		await tick();
		setTimeout(function(){ 
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		desktopScreenRecord.set("0", canvas.toDataURL("jpeg", 0.1));
		}, 10);
  }
	

  afterUpdate(() => {
		if (sharing){
			screenCapture();
		}
  }); 
	*/

	
afterUpdate (() => {


	peer.on('open', function(id) {
			console.log('My peer ID is: ' + id);
		});

		conn.on('open', function() {	
			// Receive messages
			conn.on('data', function(data) {
				console.log('Received', data);
			});

			// Send messages
			conn.send('Hello!');
		});
	});
	

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
			<div id="circle" style="left: {m.x}px; top:{m.y}px"></div>
			<DesktopEnv interactions={interactionStore} vrMode={false}></DesktopEnv>

	{/if}



	{#if isVR}
		<VirtualEnv></VirtualEnv>
	{/if}

	{#if isForm}
		<PitcherReport></PitcherReport>
	{/if}


<style>
		#circle{
		pointer-events: none;
		position:absolute;
		transform:translate(-50%,-50%);
		height:35px;
		width:35px;
		border-radius:50%;
		border:2px solid rgb(184, 12, 12);
		}
</style>