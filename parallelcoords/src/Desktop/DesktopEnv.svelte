<script>
	import { Container, Row } from 'sveltestrap';
	import { stats_store, interaction_store } from '../stores.js';
	import ParallelCoords2D from './ParallelCoords2D.svelte';
	import CoordButton from "./CoordButton.svelte";
	import OrderList from "./OrderList.svelte";
	import VirtualEnvEmbed from '../VR/VirtualEnvEmbed.svelte';
	import PitcherReport from './PitcherReport.svelte';

	export let interactions;
	
	let data

	const urlParams = new URLSearchParams(window.location.search);
    const isVR = urlParams.has('vr');

	let vrView = false;
  	const vrViewToggle = () => (vrView = !vrView);

	let report = false;
  	const reportToggle = () => (report = !report);

	const stats_unsub = stats_store.subscribe(value => {
		data = value;
	});

	//let dimensions = $stats_store["columns"].slice(4);



</script>

{#if data.length > 0}



{#if vrView}
<VirtualEnvEmbed></VirtualEnvEmbed>
{/if}

{#if report}
<PitcherReport></PitcherReport>
{/if}

<Container id="capture" fluid style="height: 100%; margin: 5px; overflow:hidden;">
	<Row style="height: 65%;">
		<ParallelCoords2D data={data} interactions={interactions}></ParallelCoords2D>
	</Row>
	<Row  style="height: 15%;">
		<div class="section">
			<OrderList interactions={interactions}></OrderList>
		</div>
	</Row>
	<Row  style="height: 15%;">
		<div class="section">
		<div class="fl" style="width: 90%;">
		{#each $stats_store["columns"].slice(3) as d}
				<CoordButton vrMode={"false"} name={d} value={d}></CoordButton>
		{/each}
		</div>
		<div class="buttons">
			<button on:click="{() => interaction_store.updateLocalColor("absolute")}">Color Absolute</button>
			<button on:click="{() => interaction_store.updateLocalColor("relative")}">Color Relative</button>
		</div>
		<div class="buttons">
			<button on:click={vrViewToggle}>Watch</button>
			<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" on:mouseleave="{() => interaction_store.peekEnd()}">Peek</button>
			<button on:click="{() => interaction_store.copy()}">Copy</button>
			<button on:click={reportToggle}>Report</button>
		</div>
	</div>
	</Row>
</Container>
{/if}

<style>
	.section {
		width: 100%;
		height: 100%;
		border: 1px solid white;
		border-radius: 2px;
		margin: 10px;
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
</style>
