<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import "aframe-dialog-popup-component";
	import {stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store, peerInteraction} from '../stores.js';
	import Field from './Field.svelte';
	import PitcherCard from '../Desktop/PitcherCard.svelte';
	import PitchBreakVR from './PitchBreakVR.svelte';
	import PitchSpeedFreqVR from "./PitchSpeedFreqVR.svelte";
	import ThreeDPitches2 from './ThreeDPitches2.svelte';
	import PitcherReport from '../Desktop/PitcherReport.svelte';
	import StatCard from '../Desktop/StatCard.svelte';
	import { windowSize, screenRecord } from '../viewStore';
	import { cameraPos, cameraRot, cameraRotRecord, cameraPosRecord } from '../viewStore';


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

	AFRAME.registerComponent('position-reader', {
		tick: function (time, timeDelta) {
			// `this.el` is the element.
			// `object3D` is the three.js object.

			// `rotation` is a three.js Euler using radians. `quaternion` also available.
			//console.log(this.el.object3D.rotation);

			// `position` is a three.js Vector3.

			//console.log(this.el.object3D.position);

			cameraPosRecord.set("0", {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z});

		}
		});

		AFRAME.registerComponent('roation-reader', {
		tick: function (time, timeDelta) {
			// `this.el` is the element.
			// `object3D` is the three.js object.

			// `rotation` is a three.js Euler using radians. `quaternion` also available.
			//console.log(this.el.object3D.rotation);

			// `position` is a three.js Vector3.

			//console.log(this.el.object3D.position);

		 	cameraRotRecord.set("0", {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57});

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

	$: filtered_pitches = data.filter(data => interactions.filter_store.includes(data.pitch_name) && interactions.filter_store.includes(data.description) && interactions.filter_store.includes(checkSpeed(data.effective_speed))).map(a => a.id);
	let formH = 1.5;

	
	let screenStore;

	const unsubscribe_screen = screenRecord.subscribe(value => {
		screenStore = value;
	});

	



</script>

{#if data.length != 0}
<a-scene webxr="optionalFeatures: light-estimation;" background="color: #ECECEC" stats>

	<a-assets>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video id="videovr" autoplay playsinline crossorigin="anonymous"></video>
	</a-assets>

<!-- Basic movement and teleportation   -->
<a-entity id="cameraRig" 
position-reader
movement-controls="constrainToNavMesh: false;" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="0.212 0 -1.321" 
rotation="0 -180 0"
>
	
	<a-entity roation-reader id="head" camera="active: true" position="0 1.6 0" look-controls="pointerLockEnabled: true; reverseMouseDrag: true" cursor="rayOrigin: mouse;"></a-entity>
				
				<a-entity id="leftHand" 
				hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF" 
				teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; curveShootingSpeed: 18; landingMaxAngle: 60"
				visible="true">
			
			
				</a-entity>
				
				
				<a-entity  id="rightHand" auto-detect-controllers="hand: right" laser-controls raycaster="showLine: true; far: 10; interval: 0; objects: .collidable" line="color: #7cfc00; opacity: 0.5" visible="true"></a-entity>

			
				<a-entity class="collidable" id="pitcher-card" htmlembed position="2 1.5 -1.2" scale="1 1 1" rotation="0 -30.000 0">
					<a-text value="Pitcher Details and Dashboard Controls" align="center" position="0 0.73 0" scale="0.45 0.45 0.45" color="black"></a-text>
						<div>
							<button on:click="{() => interaction_store.copy()}">Copy</button>
							<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" on:mouseleave="{() => interaction_store.peekEnd()}">Peek</button>
						</div>
						
						<div style="height: 300px; width: 650px;">
							<PitcherCard pitches={data} stats={ohtaniStats} interactions={interactions}></PitcherCard>
						<div>
				</a-entity>
			
				<a-entity htmlembed position="2.5 {formH} 1" rotation="0 -90.000 0">
					<div style="width: 500px; height:100%">
						<PitcherReport vr={true}></PitcherReport>
					</div>
				</a-entity>

				<a-triangle class="collidable" position="2.5 1.5 2.3" scale=".5 .5 .5"rotation="0 -90.000 0" 
					on:mousedown="{() => {formH += 0.1}}"
				></a-triangle>
				<a-triangle class="collidable" position="2.5 .8 2.3" scale=".5 .5 .5"rotation="0 -90.000 180"
					on:mousedown="{() => {formH -= 0.1}}"
				></a-triangle>
				
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
<!--<a-entity id="camera" camera="userHeight: 1.6" look-controls cursor="rayOrigin: mouse" position="0.000 0.9 -1.4" rotation="0 180 0"></a-entity>-->

<Field></Field>  

	<a-entity id="pitch-traj">
		<ThreeDPitches2 pitches={data} interactions={interactions} filtered={filtered_pitches}></ThreeDPitches2>
	</a-entity>

	
	<a-video height="{$windowSize.height}" width="{$windowSize.width}" position="0 1.5 -3" scale="0.001 0.001 0.001" src="#videovr"></a-video>

</a-scene>
{/if}