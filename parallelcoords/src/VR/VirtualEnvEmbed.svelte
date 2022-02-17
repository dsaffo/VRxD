<script>
	import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import "super-hands";
	import "aframe-physics-system";
	import Avatar from './Avatar.svelte';
	import ParallelCoords3D from "./ParallelCoords3D.svelte";
	import CoordButton from "../Desktop/CoordButton.svelte";
	import OrderList from "../Desktop/OrderList.svelte";
	import { stats_store, interaction_store, peerInteraction, tooltip_store } from '../stores';
  import { cameraPos, cameraRot, controlRecs, formRecs, chartRecs } from '../viewStore';
  import { draggable } from 'svelte-drag';

  let interactions;

  const interaction_unsub = peerInteraction.subscribe(value => {
		interactions = value;
	});

  let windowH = window.innerHeight;
  let windowW = window.innerWidth;
  let width = 1400;
  let height =  800;

	let data

	const stats_unsub = stats_store.subscribe(value => {
		data = value;
	});
</script>

<div class="resizable" style="width: 1400px; height: 800px; position:absolute; z-index: 501;" use:draggable={{ handle:'.handle'}}>
<div class="handle" style="width: 100%; height: 30px; background:tomato; text-align:center;"><h3>Collaborator View</h3></div>
{#if data.length != 0}
<a-scene background="color: #333231" embedded vr-mode-ui="enabled: false" style="width: 100%; height: 100%;">

  <a-entity id="cameraRig" 
  navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
  position="{$cameraPos.x} {$cameraPos.y} {$cameraPos.z}" 
  rotation="0 -180 0"
  >
	</a-entity>
    
  <a-entity id="head" camera="active: true" position="0 1.6 0" rotation="{$cameraRot.x} {$cameraRot.y} {$cameraRot.z}">
	</a-entity>
	
	<a-entity position="0 1.5 0">
		<ParallelCoords3D data={data} interactions={interactions}></ParallelCoords3D>
	</a-entity>
	
	<a-entity text="value: {$tooltip_store}; color: white; align: center;" rotation="0 0 0" position="0 0.35 0" scale="1.8 1.8 1.8"></a-entity>
	<a-entity text="value: {$tooltip_store}; color: white; align: center;" rotation="0 180 0" position="0 0.35 0" scale="1.8 1.8 1.8"></a-entity>
	
	<a-entity class="collidable" htmlembed rotation="0 0 0" position="0 0 0" >
		<div class="section">
			<div class="fl" style="width: 90%;">
			{#each $stats_store["columns"].slice(3) as d}
					<CoordButton vrMode={"true"} name={d} value={d}></CoordButton>
			{/each}
			</div>
			<div class="buttons">
				<button on:click="{() => interaction_store.updateLocalColor("absolute")}">Colorize Absolute</button>
				<button on:click="{() => interaction_store.updateLocalColor("relative")}">Colorize Relative</button>
			</div>
			<div class="buttons">
				<button>Watch</button>
				<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}">Peek</button>
				<button on:click="{() => interaction_store.copy()}">Copy</button>
			</div>
		</div>
	</a-entity>	
	
	<a-entity class="collidable" htmlembed rotation="0 180 0" position="0 0 0" >
		<div class="section">
			<div class="fl" style="width: 90%;">
			{#each $stats_store["columns"].slice(3) as d}
					<CoordButton vrMode={"true"} name={d} value={d}></CoordButton>
			{/each}
			</div>
			<div class="buttons">
				<button on:click="{() => interaction_store.updateLocalColor("absolute")}">Colorize Absolute</button>
				<button on:click="{() => interaction_store.updateLocalColor("relative")}">Colorize Relative</button>
			</div>
			<div class="buttons">
				<button>Watch</button>
				<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}">Peek</button>
				<button on:click="{() => interaction_store.copy()}">Copy</button>
			</div>
		</div>
	</a-entity>	
	</a-scene>
	{/if}
</div>

	<style>
	.section {
		width: 1500px;
		height: 120px;
		padding: 10px;
	
	}
	
	.buttons {
			width: 4%;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-evenly;
		}
	
	
	.fl {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	
	.flex {
			border: 2px solid white;
			border-radius: 5px;
			background: rgba(0, 0, 0, 0.80);
			padding: 10px;
			height: fit-content;
			width: fit-content;
			display: flex;
			flex-direction: column; 
			flex-wrap:wrap;
		}
	</style>