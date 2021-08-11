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
	import PitcherCard from '../Desktop/PitcherCard.svelte';
	import { Col,  Row, Container} from 'sveltestrap';


	let innerWidth = 500;
  let innerHeight = 200;

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


<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>

<a-scene>

<!-- Basic movement and teleportation  -->
<a-entity id="cameraRig" 
movement-controls="constrainToNavMesh: false;" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="0.212 0 -1.321" 
rotation="0 -180 0">
	
	<a-entity id="head" camera="active: true" position="0 1.6 0" look-controls="pointerLockEnabled: true; reverseMouseDrag: true" cursor="rayOrigin: mouse;"></a-entity>
				
				<a-entity id="leftHand" 
				hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF" 
				teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; curveShootingSpeed: 18; landingMaxAngle: 60"
				visible="true"></a-entity>
				
				<a-entity id="rightHand" 
				hand-controls="hand: right; handModelStyle: lowPoly; color: #15ACCF" 
				laser-controls raycaster="showLine: true; far: 10; interval: 0;" 
				line="color: #7cfc00; opacity: 0.5" 
				visible="true"></a-entity>

				
				<a-entity id="embed" htmlembed position="1.029  1.5 -1" scale="1 1 1" rotation="0 -30.000 0">
					<Container fluid style="height: 100%; margin: 5px;">
						<Row style="height: 30%;">
							<Col sm='1' style='padding: 20px;'>
								<Row>
									<button on:click="{() => page.update(n => n = 1)}">switch</button>
								</Row>
							
								<Row>
									<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}">Peek</button>
								</Row>
				
								<Row>
									<button on:click="{() => interaction_store.copy()}" on:mouseup="{() => interaction_store.copyEnd()}">Copy</button>
								</Row>
							</Col>
							</Row>
					</Container>
				</a-entity>

				
				
</a-entity>


<!--<a-entity id="camera" camera="userHeight: 1.6" look-controls cursor="rayOrigin: mouse" position="0.000 0.9 -1.4" rotation="0 180 0"></a-entity>-->

<Field></Field>  

{#if data.length != 0}
	<ThreeDPitches pitches={filtered_pitches}></ThreeDPitches>
{/if}

  
</a-scene>
