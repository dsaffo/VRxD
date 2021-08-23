<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import {page, stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store, peerInteraction, updateCameraPos} from '../stores.js';
	import Field from './Field.svelte';
	import ThreeDPitches from './ThreeDpitches.svelte';
	import DesktopEnv from '../Desktop/DesktopEnv.svelte';
	import PitcherCard from '../Desktop/PitcherCard.svelte';
	import PitchSpeedFreq from '../Desktop/PitchSpeedFreq.svelte';
	import FilterLegend from '../FilterLegend.svelte';
	import StatCard from '../Desktop/StatCard.svelte';
	import PitchBreakVR from './PitchBreakVR.svelte';
	import PitchSpeedFreqVR from "./PitchSpeedFreqVR.svelte";
	import ThreeDPitches2 from './ThreeDpitches2.svelte';




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

	const interaction_unsub = interaction_store.subscribe(value => {
		interactions = value;
	});

	const peer_unsub = peerInteraction.subscribe(value => {
		peerInteractions = value;
	});

	AFRAME.registerComponent('rotation-reader', {
		tick: function (time, timeDelta) {
			// `this.el` is the element.
			// `object3D` is the three.js object.

			// `rotation` is a three.js Euler using radians. `quaternion` also available.
			//console.log(this.el.object3D.rotation);

			// `position` is a three.js Vector3.
			//console.log(this.el.object3D.position);
			updateCameraPos({pos:{x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
							 rot: {x: this.el.object3D.rotation.x * 57.2958, y: this.el.object3D.rotation.y * 57.2958, z: this.el.object3D.rotation.z * 57.2958}
							})
		}
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

{#if data.length != 0}
<a-scene webxr="optionalFeatures: light-estimation;" background="color: #ECECEC" stats>

<!-- Basic movement and teleportation   -->
<a-entity id="cameraRig" 
movement-controls="constrainToNavMesh: false;" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="0.212 0 -1.321" 
rotation="0 -180 0"
>
	
	<a-entity id="head" camera="active: true" position="0 1.6 0" look-controls="pointerLockEnabled: true; reverseMouseDrag: true" cursor="rayOrigin: mouse;"></a-entity>
				
				<a-entity id="leftHand" 
				hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF" 
				teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; curveShootingSpeed: 18; landingMaxAngle: 60"
				visible="true"></a-entity>
				
				<!--<a-entity id="rightHand" 
				hand-controls="hand: right; handModelStyle: lowPoly; color: #15ACCF" 
				laser-controls raycaster="showLine: true; far: 10; interval: 0;" 
				line="color: #7cfc00; opacity: 0.5" 
				visible="true"></a-entity>-->

				<a-entity  id="rightHand" auto-detect-controllers="hand: right" laser-controls raycaster="showLine: true; far: 10; interval: 0; objects: .collidable" line="color: #7cfc00; opacity: 0.5" visible="true"></a-entity>

				
				<a-entity class="collidable" id="pitcher-card" htmlembed position="2 1.5 -1.2" scale="1 1 1" rotation="0 -30.000 0">
						<div>
							<button on:click="{() => interaction_store.copy()}">Copy</button>
							<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" on:mouseleave="{() => interaction_store.peekEnd()}">Peek</button>
						</div>
						
						<div style="height: 300px; width: 650px;">
							<PitcherCard pitches={data} stats={ohtaniStats} interactions={interactions}></PitcherCard>
						<div>
						
				
				</a-entity>

				<!--
				<a-entity class="collidable" id="stat-card" htmlembed position="0  3.2 -2" scale="1 1 1" rotation="30 0 0">
					<StatCard percentiles={ohtaniPercentile} stats={ohtaniStats} interactions={interactions}></StatCard>
				</a-entity>-->

				
				<a-entity  id="pitch-break" position="-2 1.5 -1.2" scale="1 1 1" rotation="0 30.000 0">
					<PitchBreakVR pitches={filtered_pitches} interactions={interactions}></PitchBreakVR>
				</a-entity>
	
				<a-entity id="pitch-speed-freq" htmlembed position="-2.85 1.5 0.311" scale="1 1 1" rotation="0 91 0">
					<PitchSpeedFreqVR pitches={filtered_pitches} data={data} interactions={interactions}></PitchSpeedFreqVR>
				</a-entity>
							
</a-entity>
<!--<a-entity id="camera" camera="userHeight: 1.6" look-controls cursor="rayOrigin: mouse" position="0.000 0.9 -1.4" rotation="0 180 0"></a-entity>-->

<Field></Field>  

	{#if filtered_pitches !=0}
		<!--<ThreeDPitches pitches={filtered_pitches} interactions={interactions}></ThreeDPitches>-->

		<ThreeDPitches2 pitches={filtered_pitches} interactions={interactions}></ThreeDPitches2>

	{/if}

<!--
<a-entity class="collidable" id="desktopview" htmlembed position="0 1.5 -3" scale="0.5 0.5 0.5" rotation="0 0 0" style="height: {1080}px; width: {1920}px;">
		<DesktopEnv interactions={peerInteractions} vrMode={true}></DesktopEnv>
</a-entity>-->

  
</a-scene>
{/if}