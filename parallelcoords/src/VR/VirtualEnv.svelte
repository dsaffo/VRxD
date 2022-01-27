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
	import { stats_store } from '../stores';

	export let interactions;

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
</script>


{#if data.length != 0}
<a-scene physics="gravity:0;" webxr="optionalFeatures: light-estimation;" background="color: #ECECEC" stats>

	<a-assets>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video id="videovr" autoplay playsinline crossorigin="anonymous"></video>
	</a-assets>

<!-- Basic movement and teleportation   -->
<Avatar>			
</Avatar>

<a-entity position="0 1.5 0">
	<ParallelCoords3D data={data} interactions={interactions}></ParallelCoords3D>
</a-entity>
<a-entity class="collidable" htmlembed rotation="0 0 0" position="0 0 0" >
	<div class="section fl">
		{#each $stats_store["columns"].slice(3) as d}
				<CoordButton name={d} value={d}></CoordButton>
		{/each}
	</div>
</a-entity>

<!--<a-entity class="collidable" htmlembed rotation="0 0 0" position="0 2 0" >
	<OrderList interactions={interactions}></OrderList>
</a-entity>-->

</a-scene>


{/if}

<style>
.section {
	width: 100%;
	height: 100%;
	padding: 10px;

}

.fl {
	display: inline-flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
</style>