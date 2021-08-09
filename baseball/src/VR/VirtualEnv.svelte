<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import {page, stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store} from '../stores.js';
	import Field from './Field.svelte';
	import ThreeDPitches from './ThreeDpitches.svelte';
	import DesktopEnv from '../Desktop/DesktopEnv.svelte';

	//subscribe to stored_data and assign its value to data
	//subscribe to stored_data and assign its value to data
	let data;
	let ohtaniStats;
	let ohtaniPercentile;
	let interactions;

	const stats_unsub = ohtani_stats_store.subscribe(value => {
		ohtaniStats = value[0];
	});

	const percentile_unsub = ohtani_percentile_store.subscribe(value => {
		ohtaniPercentile = value[0];
	});

	const pitches_unsub = stored_data.subscribe(value => {
		data = value;
	});

	const interaction_unsub = interaction_store.subscribe(value => {
		interactions = value;
	});


	function checkSpeed(speed) {

		if (speed >= 65 && speed <= 75){
			return "65-75"
		} 
		else if (speed >= 75 && speed <= 85) {
			return "75-85"
		} 
		else if (speed >= 85 && speed <= 95) {
			return "85-95"
		} 
		else if (speed >= 95 && speed <= 105) {
			return "95-105"
		} else {
			return "0"
		}
	}

	$: filtered_pitches = data.filter(data => interactions.filter_store.includes(data.pitch_name) && interactions.filter_store.includes(data.description) && interactions.filter_store.includes(checkSpeed(data.effective_speed)));


</script>
<a-scene>

<!-- Basic movement and teleportation  -->
<a-entity id="cameraRig" 
movement-controls="constrainToNavMesh: false;" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="0.212 0 -1.321" 
rotation="0 -180 0">
	<!-- camera -->
	<a-entity id="head" camera="active: true" position="0 1.6 0" look-controls="pointerLockEnabled: true; reverseMouseDrag: true" ></a-entity>
				<!-- Left Controller -->
				<a-entity id="leftHand" 
				hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF" 
				teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; curveShootingSpeed: 18; landingMaxAngle: 60"
				visible="true"></a-entity>
				<!-- Right Controller -->
				<a-entity id="rightHand" 
				hand-controls="hand: right; handModelStyle: lowPoly; color: #15ACCF" 
				laser-controls raycaster="showLine: true; far: 10; interval: 0; objects: .clickable, a-link;" 
				line="color: #7cfc00; opacity: 0.5" 
				visible="true"></a-entity>
</a-entity>

<Field></Field>  

{#if data.length != 0}
	<ThreeDPitches pitches={filtered_pitches}></ThreeDPitches>
	<a-entity htmlembed position="-1.02 1.34 -0.2" scale="0.2 0.2 0.2" rotation="0 140 0" style="height: 1080px; width: 1930px;">
		<DesktopEnv></DesktopEnv>
	</a-entity>

{/if}

  
</a-scene>
