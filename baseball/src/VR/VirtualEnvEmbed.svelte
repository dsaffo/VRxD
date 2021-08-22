<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import {stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store, peerInteraction, cameraPosition} from '../stores.js';
	import Field from './Field.svelte';
	import ThreeDPitches from './ThreeDpitches.svelte';
	import PitcherCard from '../Desktop/PitcherCard.svelte';
	import StatCard from '../Desktop/StatCard.svelte';
	import PitchBreakVR from './PitchBreakVR.svelte';
	import PitchSpeedFreqVR from "./PitchSpeedFreqVR.svelte";



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

	let pitchTypes = [...new Set(data.map(item => item.pitch_name))];
    let pitchOutcomes = [...new Set(data.map(item => item.description))];
    let pitchSpeeds = ["65-75", "75-85", "85-95", "95-105"];
    let pitchSpeedValues = [70,80,90,100];


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
<a-scene embedded vr-mode-ui="enabled: false" style="width: 1400px; height: 800px; position: absolute;
top: {window.innerHeight / 2 - 400}px;
left: {window.innerWidth / 2 - 700}px;">

<!-- Basic movement and teleportation   -->

<a-entity id="cameraRig" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="{$cameraPosition.pos.x} 0 {$cameraPosition.pos.z}" 
rotation="0 -180 0"
>
	
<a-entity id="head" camera="active: true" position="0 1.6 0"></a-entity>
				
				
				<a-entity class="collidable" id="pitcher-card" htmlembed position="2 1.5 -1.2" scale="1 1 1">
						<div>
							<button on:click="{() => interaction_store.copy()}" on:mouseup="{() => interaction_store.copyEnd()}">Copy</button>
							<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}">Peek</button>
						</div>
						<div style="height: 300px; width: 650px;">
							<PitcherCard pitches={data} stats={ohtaniStats} interactions={interactions}></PitcherCard>
						<div>
				
				</a-entity>
				<!--
				<a-entity class="collidable" id="stat-card" htmlembed position="0  3.2 -2" scale="1 1 1" rotation="30 0 0">
					<StatCard percentiles={ohtaniPercentile} stats={ohtaniStats} interactions={interactions}></StatCard>
				</a-entity>

				
				<a-entity class="collidable" id="pitch-break" position="-2 1.5 -1.2" scale="1 1 1" rotation="0 30.000 0">
				
					<PitchBreakVR pitches={filtered_pitches} interactions={interactions}></PitchBreakVR>

				</a-entity>
	
				<a-entity class="collidable" id="pitch-speed-freq" htmlembed position="-2.85 1.5 0.311" scale="1 1 1" rotation="0 91 0">
					<PitchSpeedFreqVR pitches={filtered_pitches} data={data} interactions={interactions}></PitchSpeedFreqVR>
				</a-entity>
			-->

</a-entity>


<Field></Field>  

{#if data.length != 0}
	<ThreeDPitches pitches={filtered_pitches} interactions={interactions}></ThreeDPitches>
{/if}




</a-scene>
