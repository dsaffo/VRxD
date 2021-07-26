<script>
	import "aframe";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-curve-component";
	import { pitch_trajectory }  from '../pitchCalc.js';
	import { page, stored_data } from '../stores.js';
	import Field from './Field.svelte';

	//subscribe to stored_data and assign its value to data
	let data;
	const unsubscribe = stored_data.subscribe(value => {
		data = value;
	});
  //print its result for testing
  $: console.log(data);

  let pitch = [];

  let index = 68;

  if (data != null){
  	pitch = pitch_trajectory(data[index]['release_pos_x'],data[index]['release_pos_y'],data[index]['release_pos_z'],
	  						data[index]['vx0'], data[index]['vy0'], data[index]['vz0'],data[index]['ax'],data[index]['ay'],data[index]['az'],data[index]['release_spin_rate'],0.001)
  }

  $: console.log(pitch);



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

{#if data != null}
<a-curve id="track1" type="CatmullRom" position="0 0 0" rotation="" scale="" visible="" curve="">
	{#each pitch as p}
		<a-curve-point position="{-p.x} {p.z} {p.y}"></a-curve-point>
	{/each}
  </a-curve>

  <a-draw-curve curveref="#track1" material="shader: line; color: blue;"></a-draw-curve>

  <a-sphere position="{-data[index]['plate_x']} {data[index]['plate_z']} 0" radius='0.036'></a-sphere>
{/if}

  
</a-scene>
