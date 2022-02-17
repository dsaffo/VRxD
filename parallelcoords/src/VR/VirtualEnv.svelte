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
	import { stats_store, interaction_store, tooltip_store } from '../stores';
	import { windowSize, chartRecord, formRecord, controlRecord} from '../viewStore';
	import PitcherReport from "../Desktop/PitcherReport.svelte";

	export let interactions;

	let formH = 0;

	let data
	const stats_unsub = stats_store.subscribe(value => {
		data = value;
	});

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

		
	$: index = data.findIndex(object => {
  	return object.player_id == interactions.hover_store;
	});
	$: player = data[index];
	$: visible = (index === -1) ? false : true;
	//$: console.log(index, player, visible);

</script>


{#if data.length != 0}
<a-scene physics="gravity:0;" webxr="optionalFeatures: light-estimation;" background="color: #333231" stats>

	<a-assets>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video id="videovr" autoplay playsinline crossorigin="anonymous"></video>
	</a-assets>

<!-- Basic movement and teleportation   -->
<Avatar>	
	<a-entity visible="{visible}" htmlembed position="0 0.5 -1.5" rotation="10 0 0">
		<div class="flex">
			{#if index != -1}
			<div style="margin-bottom: 5px; display:flex; flex-flow: row wrap; width: 100%;">
				<div style="font-size: medium; font-weight: bold;">{player.first_name} {player.last_name}</div>
			</div>
			{#each interactions.filter_store as coord}    
			<div style="margin-bottom: 2px; display:flex; flex-flow: row; width: 100%;">
				<div style="width: 50%;">{coord}:</div>
				<div style="width: 50%;  text-align:right;">{player[coord]}</div>
				</div>
			{/each}
			{/if}
		</div>
		</a-entity>
</Avatar>

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

	<!--Report Form-->
	<a-entity  form-reader class="collidable"  move dynamic-body="angularDamping: 1; linearDamping: 1;" grabbable="startButtons: gripdown, gripclose, mousedown; endButtons: gripup, gripopen, mouseup;" geometry="primitive: box; width: 2; height: 2.3; depth: 0.5" material="opacity: 0; transparent: true; depthTest: false;" position="3.5 1.5 2.5" rotation="0 -90.000 0">
		<a-entity htmlembed position="0 {formH} 0">
			<div style="width: 500px; height:100%">
				<PitcherReport vr={true}></PitcherReport>
			</div>
		</a-entity>
		<a-triangle class="collidable" position="1.4 0.6 0" scale=".5 .5 .5" on:mousedown="{() => {formH += 0.1}}"></a-triangle>
		<a-triangle class="collidable" position="1.4 0 0" rotation="0 0 180"  scale=".5 .5 .5" on:mousedown="{() => {formH -= 0.1}}"></a-triangle>
	</a-entity>

	<a-video id="watch" class="collidable" move dynamic-body="angularDamping: 1; linearDamping: 1;" grabbable="startButtons: gripdown, gripclose, mousedown; endButtons: gripup, gripopen, mouseup;" height="{$windowSize.height}" width="{$windowSize.width}" position="-3.5 1.5 3" rotation="0 90 0" scale="0.001 0.001 0.001" src="#videovr"></a-video>

</a-scene>


{/if}

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
    height: min-content;
    width: 150px;
    display: flex;
    flex-direction: column; 
    flex-wrap:wrap;
  }
</style>