<script>
	import { Col, Container, Row } from 'sveltestrap';
  	import {page, stored_data, ohtani_stats_store, ohtani_percentile_store} from '../stores.js';
	import OverheadPitch from './OverheadPitch.svelte';
	import SidePitch from './SidePitch.svelte';
	import StrikeZone from './StrikeZone.svelte';
  	import PitchBreak from './PitchBreak.svelte';
  	import PitchSpeedFreq from './PitchSpeedFreq.svelte';
	import PitcherCard from './PitcherCard.svelte';
	import StatCard from './StatCard.svelte';


	//subscribe to stored_data and assign its value to data
	let data;
	let ohtaniStats;
	let ohtaniPercentile;

	const sdasd = ohtani_stats_store.subscribe(value => {
		ohtaniStats = value[0];
	});

	const addasasda = ohtani_percentile_store.subscribe(value => {
		ohtaniPercentile = value[0];
	});

	const unsubscribe = stored_data.subscribe(value => {
		data = value;
	});



	
	//print its result for testing
	$: console.log("hello", ohtaniPercentile)

	let pitch = [];

	let index = 0;

	let start = 0;
	let end = 90;

</script>

{#if data!= null}
	<Container fluid style="height: 100%; margin: 5px;">
		<Row style="height: 30%;">
			<Col sm='4' style='padding: 20px;'>
				<PitcherCard pitches={data} stats={ohtaniStats}></PitcherCard>
			</Col>
			<Col sm='8' style='padding: 20px;'>
				<StatCard stats={ohtaniStats} percentiles={ohtaniPercentile}></StatCard>
			</Col>
		</Row>

		<Row style="height: 35%;">
			<Col  sm='2' style='padding: 20px;'>
				<StrikeZone pitches={data.slice(start,end)}></StrikeZone>
			</Col>
			<Col style='padding: 20px;'>
				<OverheadPitch data={data.slice(start,end)}></OverheadPitch>
			</Col>
			<Col style='padding: 20px;'>
				<SidePitch data={data.slice(start,end)}></SidePitch>
			</Col>
		</Row>

		<Row style="height: 35%;">
			<Col  sm='6' style='padding: 20px;'>
				<PitchSpeedFreq pitches={data}></PitchSpeedFreq>
			</Col>
			<Col sm='6' style='padding: 20px;'>
				<PitchBreak pitches={data}></PitchBreak>
			</Col>
		</Row>

		<button on:click="{() => page.update(n => n = 1)}">switch</button>
	</Container>


{/if}
