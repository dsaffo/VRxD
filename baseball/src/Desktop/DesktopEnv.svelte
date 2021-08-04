<script>
	import { Col, Container, Row } from 'sveltestrap';
  	import {page, stored_data, ohtani_stats_store, ohtani_percentile_store, filter_store} from '../stores.js';
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
	let filters;

	const stats_unsub = ohtani_stats_store.subscribe(value => {
		ohtaniStats = value[0];
	});

	const percentile_unsub = ohtani_percentile_store.subscribe(value => {
		ohtaniPercentile = value[0];
	});

	const pitches_unsub = stored_data.subscribe(value => {
		data = value;
	});

	const filters_unsub = filter_store.subscribe(value => {
		filters = value;
	});

	
	//print its result for testing
	$: console.log("hello", filters);

	let pitch = [];

	let index = 0;

	let start = 0;
	let end = 90;

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

	$: filtered_pitches = data.filter(data => filters.includes(data.pitch_name) && filters.includes(data.description) && filters.includes(checkSpeed(data.effective_speed)));

</script>

{#if data.length != 0}
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
				<StrikeZone pitches={filtered_pitches}></StrikeZone>
			</Col>
			<Col style='padding: 20px;'>
				<OverheadPitch data={filtered_pitches}></OverheadPitch>
			</Col>
			<Col style='padding: 20px;'>
				<SidePitch data={filtered_pitches}></SidePitch>
			</Col>
		</Row>

		<Row style="height: 35%;">
			<Col  sm='6' style='padding: 20px;'>
				<PitchSpeedFreq pitches={filtered_pitches} data={data}></PitchSpeedFreq>
			</Col>
			<Col sm='6' style='padding: 20px;'>
				<PitchBreak pitches={filtered_pitches}></PitchBreak>
			</Col>
		</Row>

		<button on:click="{() => page.update(n => n = 1)}">switch</button>
	</Container>


{/if}
