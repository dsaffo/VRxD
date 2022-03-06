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
	import { cameraPos, cameraRot, controlRecs, formRecs, chartRecs } from '../viewStore';
	import PitcherReport from '../Desktop/PitcherReport.svelte';
	import { draggable } from 'svelte-drag';



	let windowH = window.innerHeight;
 let windowW = window.innerWidth;
 let width = 1400;
 let height =  800;


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


	
	$: filtered_pitches = data.filter(data => interactions.filter_store.includes(data.pitch_name) && interactions.filter_store.includes(data.description) && interactions.filter_store.includes(checkSpeed(data.effective_speed))).map(a => a.id);;

</script>

<div class="resizable" style="width: 1400px; height: 800px; " use:draggable={{ handle:'.handle', defaultPosition:  { x: (windowW - width)/2, y:  -windowH + (height/2)/2}}}>
<div class="handle" style="width: 100%; height: 30px; background:tomato; text-align:center;"><h3>Collaborator View</h3></div>
<a-scene background="color: #ECECEC" embedded vr-mode-ui="enabled: false" style="width: 100%; height: 100%;">

<!-- Basic movement and teleportation   -->
{#if data.length != 0}	


<a-entity id="cameraRig" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="{$cameraPos.x} {$cameraPos.y} {$cameraPos.z}" 
rotation="0 -180 0">
	<a-entity id="head" camera="active: true" position="0 1.6 0" rotation="{$cameraRot.x} {$cameraRot.y} {$cameraRot.z}"></a-entity>



<a-entity geometry="primitive: box; width: 2.5s; height: 1.3; depth: 0.5" material="opacity: 0; transparent: true; depthTest: false;" position="{$controlRecs.pos.x} {$controlRecs.pos.y} {$controlRecs.pos.z}" rotation="{$controlRecs.rot.x} {$controlRecs.rot.y} {$controlRecs.rot.z}">
	<a-entity id="pitcher-card" htmlembed>
		<a-text value="Pitcher Details and Dashboard Controls" align="center" position="0 0.73 0" scale="0.45 0.45 0.45" color="black"></a-text>
			<div>
				<button on:click="{() => interaction_store.copy()}">Copy</button>
				<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" on:mouseleave="{() => interaction_store.peekEnd()}">Peek</button>
			</div>
			
			<div style="height: 300px; width: 650px;">
				<PitcherCard pitches={data} stats={ohtaniStats} interactions={interactions}></PitcherCard>
			<div>
	</a-entity>
</a-entity>


<a-entity geometry="primitive: box; width: 2; height: 2.3; depth: 0.5" material="opacity: 0; transparent: true; depthTest: false;" position="{$formRecs.pos.x} {$formRecs.pos.y} {$formRecs.pos.z}" rotation="{$formRecs.rot.x} {$formRecs.rot.y} {$formRecs.rot.z}">
	<a-entity htmlembed position="0 {$formRecs.height} 0">
		<div style="width: 500px; height:100%">
			<PitcherReport vr={true}></PitcherReport>
		</div>
	</a-entity>
	<a-triangle class="collidable" position="1.4 0.6 0" scale=".5 .5 .5"></a-triangle>
	<a-triangle class="collidable" position="1.4 0 0" rotation="0 0 180"  scale=".5 .5 .5"></a-triangle>
</a-entity>



<a-entity position="{$chartRecs.pos.x} {$chartRecs.pos.y} {$chartRecs.pos.z}" rotation="{$chartRecs.rot.x} {$chartRecs.rot.y} {$chartRecs.rot.z}">
	<a-entity id="stat-card" htmlembed position="-1.891  0.3 -0.163" scale="1 1 1" rotation="-25 90 0" >
		<a-text value="Pitcher Stats and Performance Percentile" align="center" position="0 0.65 0" scale="0.45 0.45 0.45" color="black"></a-text>
		<div style="width: 1000px; height: 300px">
			<StatCard percentiles={ohtaniPercentile} stats={ohtaniStats} interactions={interactions}></StatCard>
		</div>
	</a-entity>

	<a-entity id="pitch-break" position="-2 1.5 -1.2" scale="1 1 1" rotation="0 80 0">
		<a-text value="Vertical/Horizontal Break From a Straight Line" align="center" position="0 0.6 0" scale="0.45 0.45 0.45" color="black"></a-text>
		<PitchBreakVR pitches={data} interactions={interactions} filtered={filtered_pitches}></PitchBreakVR>
	</a-entity>

	<a-entity id="pitch-speed-freq" position="-2 1.5 0.9" scale="1 1 1" rotation="0 100 0">
		<a-text value="Pitch Frequency and Speed" align="center" position="0 0.6 0" scale="0.45 0.45 0.45" color="black"></a-text>
		<PitchSpeedFreqVR pitches={data} interactions={interactions} filtered={filtered_pitches}></PitchSpeedFreqVR>
	</a-entity>	
</a-entity>	
</a-entity>



<Field></Field>  

<ThreeDPitches2 pitches={data} interactions={interactions} filtered={filtered_pitches}></ThreeDPitches2>

{/if}

</a-scene>
</div>

<style>
.resizable {
  resize: both;
  overflow: auto;
  border: 3px solid black;
}
</style>
