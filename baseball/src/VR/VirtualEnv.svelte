<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import "super-hands";
	import "aframe-physics-system";
	import {stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store, peerInteraction} from '../stores.js';
	import Field from './Field.svelte';
	import PitcherCard from '../Desktop/PitcherCard.svelte';
	import PitchBreakVR from './PitchBreakVR.svelte';
	import PitchSpeedFreqVR from "./PitchSpeedFreqVR.svelte";
	import ThreeDPitches2 from './ThreeDPitches2.svelte';
	import PitcherReport from '../Desktop/PitcherReport.svelte';
	import StatCard from '../Desktop/StatCard.svelte';
	import Avatar from './Avatar.svelte';
	import { windowSize, chartRecord, formRecord, controlRecord} from '../viewStore';



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
	let formH = 0;


	AFRAME.registerComponent('chart-reader', {
		tick: function (time, timeDelta) {
      //console.log("roation",this.el.object3D.rotation);
			chartRecord.set("0", {pos: {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
																rot: {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57}});
		}
		});

		AFRAME.registerComponent('control-reader', {
		tick: function (time, timeDelta) {
      //console.log(this.el.object3D.position);
			controlRecord.set("0", {pos: {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
																rot: {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57}});
		}
		});

		AFRAME.registerComponent('form-reader', {
		tick: function (time, timeDelta) {
      //console.log(this.el.object3D.position);
			formRecord.set("0", {pos: {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
																rot: {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57},
																height: formH});
		}
		});

</script>

{#if data.length != 0}
<a-scene physics="gravity:0;" webxr="optionalFeatures: light-estimation;" background="color: #ECECEC" stats>

	<a-assets>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video id="videovr" autoplay playsinline crossorigin="anonymous"></video>
	</a-assets>

<!-- Basic movement and teleportation   -->
<Avatar>		

	<!--Filter Controls-->
	<a-entity control-reader move dynamic-body="angularDamping: 1; linearDamping: 1;" grabbable="startButtons: gripdown, gripclose; endButtons: gripup, gripopen;" position="2 1.5 -1.2" scale="1 1 1" rotation="0 -30.000 0">
		<a-entity class="collidable" id="pitcher-card" htmlembed>
			<a-text value="Pitcher Details and Dashboard Controls" align="center" position="0 0.73 0" scale="0.45 0.45 0.45" color="black"></a-text>
				<div>
					<button on:click="{() => interaction_store.copy()}">Copy</button>
					<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" on:mouseleave="{() => interaction_store.peekEnd()}">Peek</button>
					<button on:click="{() => document.dispatchEvent(new CustomEvent('animateAll'))}">Animate All</button>
				</div>
				
				<div style="height: 300px; width: 650px;">
					<PitcherCard pitches={data} stats={ohtaniStats} interactions={interactions}></PitcherCard>
				<div>
		</a-entity>
	</a-entity>

	<!--Report Form-->
	<a-entity  form-reader class="collidable"  move dynamic-body="angularDamping: 1; linearDamping: 1;" grabbable="startButtons: gripdown, gripclose, mousedown; endButtons: gripup, gripopen, mouseup;" geometry="primitive: box; width: 2; height: 2.3; depth: 0.5" material="opacity: 0; transparent: true; depthTest: false;" position="2.5 1.5 1" rotation="0 -90.000 0">
		<a-entity htmlembed position="0 {formH} 0">
			<div style="width: 500px; height:100%">
				<PitcherReport vr={true}></PitcherReport>
			</div>
		</a-entity>
		<a-triangle class="collidable" position="1.4 0.6 0" scale=".5 .5 .5" on:mousedown="{() => {formH += 0.1}}"></a-triangle>
		<a-triangle class="collidable" position="1.4 0 0" rotation="0 0 180"  scale=".5 .5 .5" on:mousedown="{() => {formH -= 0.1}}"></a-triangle>
	</a-entity>

	<!--2D Charts and Stats-->
	<a-entity  chart-reader move dynamic-body="angularDamping: 1; linearDamping: 1;" grabbable="startButtons: gripdown, gripclose, mousedown; endButtons: gripup, gripopen, mouseup;">
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
</Avatar>

<Field></Field>  

	<a-entity id="pitch-traj">
		<ThreeDPitches2 pitches={data} interactions={interactions} filtered={filtered_pitches}></ThreeDPitches2>
	</a-entity>

	
	<a-video id="watch" visible="false" class="collidable" move dynamic-body="angularDamping: 1; linearDamping: 1;" grabbable height="{$windowSize.height}" width="{$windowSize.width}" position="0 1.5 -3" scale="0.001 0.001 0.001" src="#videovr"></a-video>

</a-scene>
{/if}