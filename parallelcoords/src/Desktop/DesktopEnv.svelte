<script>
	import { Col, Container, Row } from 'sveltestrap';
	import { stats_store, interaction_store } from '../stores.js';
	import ParallelCoords2D from './ParallelCoords2D.svelte';
	import CoordButton from "./CoordButton.svelte";
	import DragList from "./DragList.svelte";
	import PlayerInfo from './PlayerInfo.svelte';

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

<Container id="capture" fluid style="height: 100%; margin: 5px;">
	<Row style="height: 10%;">
		<div class="section">
			<PlayerInfo data={data} interactions={interactions}></PlayerInfo>
		</div>
	</Row>
	<Row style="height: 50%;">
		<ParallelCoords2D data={data} interactions={interactions}></ParallelCoords2D>
	</Row>
	<Row  style="height: 15%;">
		<div class="section">
			<DragList interactions={interactions}></DragList>
		</div>
	</Row>
	<Row  style="height: 15%;">
		<div class="section fl">
		{#each $stats_store["columns"].slice(4) as d}
				<CoordButton name={d} value={d}></CoordButton>
		{/each}
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

	.fl {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
	}
</style>
