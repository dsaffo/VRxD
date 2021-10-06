<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import {stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store, peerInteraction} from '../stores.js';
	import Field from './Field.svelte';
	import ThreeDPitches2 from './ThreeDPitches2.svelte';
	import PitcherCard from '../Desktop/PitcherCard.svelte';
	import StatCard from '../Desktop/StatCard.svelte';
	import PitchBreakVR from './PitchBreakVR.svelte';
	import PitchSpeedFreqVR from "./PitchSpeedFreqVR.svelte";
	import { cameraPos, cameraRot } from '../viewStore';
	import PitcherReport from '../Desktop/PitcherReport.svelte';



	//subscribe to stored_data and assign its value to data
	//subscribe to stored_data and assign its value to data
	let data;
	let ohtaniStats;
	let ohtaniPercentile;
	let interactions;
	let peerInteractions;

	const stats_unsub = ohtani_stats_store.subscribe(value => {
		ohtaniStats = value[0];
	});

	const percentile_unsub = ohtani_percentile_store.subscribe(value => {
		ohtaniPercentile = value[0];
	});

	const pitches_unsub = stored_data.subscribe(value => {
		data = value;
	});

	const interaction_unsub = peerInteraction.subscribe(value => {
		interactions = value;
	});

	const peer_unsub = peerInteraction.subscribe(value => {
		peerInteractions = value;
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

	$: console.log($cameraPos, $cameraRot);
</script>
<a-scene background="color: #ECECEC" embedded vr-mode-ui="enabled: false" style="width: 1400px; height: 800px; position: absolute;
top: {window.innerHeight / 2 - 400}px;
left: {window.innerWidth / 2 - 700}px;">

<!-- Basic movement and teleportation   -->
{#if data.length != 0}	
<a-entity id="cameraRig" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="{$cameraPos.x} {$cameraPos.y} {$cameraPos.z}" 
rotation="0 -180 0"
>
	
<a-entity id="head" camera="active: true" position="0 1.6 0" rotation="{$cameraRot.x} {$cameraRot.y} {$cameraRot.z}"></a-entity>
				
		

</a-entity>


<Field></Field>  

{#if filtered_pitches.length != 0}
	<ThreeDPitches2 pitches={data} interactions={interactions} filtered={filtered_pitches}></ThreeDPitches2>
{/if}
{/if}



</a-scene>
