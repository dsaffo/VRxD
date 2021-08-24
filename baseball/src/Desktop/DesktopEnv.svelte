<script>
	import { Col, Container, Row, Modal, ModalBody} from 'sveltestrap';
  	import {stored_data, ohtani_stats_store, ohtani_percentile_store, interaction_store} from '../stores.js';
	import OverheadPitch from './OverheadPitch.svelte';
	import SidePitch from './SidePitch.svelte';
	import StrikeZone from './StrikeZone.svelte';
  	import PitchBreak from './PitchBreak.svelte';
  	import PitchSpeedFreq from './PitchSpeedFreq.svelte';
	import PitcherCard from './PitcherCard.svelte';
	import StatCard from './StatCard.svelte';
	import VirtualEnvEmbed from '../VR/VirtualEnvEmbed.svelte';
	import PitcherReport from './PitcherReport.svelte';
	import { mousePos } from '../viewStore';

	const urlParams = new URLSearchParams(window.location.search);
    const isVR = urlParams.has('vr');

	let vrView = false;
  	const vrViewToggle = () => (vrView = !vrView);

	let report = false;
  	const reportToggle = () => (report = !report);

	//subscribe to stored_data and assign its value to data
	let data;
	let ohtaniStats;
	let ohtaniPercentile;
	export let interactions;
	export let vrMode = false;

	const stats_unsub = ohtani_stats_store.subscribe(value => {
		ohtaniStats = value[0];
	});

	const percentile_unsub = ohtani_percentile_store.subscribe(value => {
		ohtaniPercentile = value[0];
	});

	const pitches_unsub = stored_data.subscribe(value => {
		data = value;
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

	//this is really slow gets called every time there is an interaction but only needs to happen when the filter gets changed
	$: filtered_pitches = data.filter(data => interactions.filter_store.includes(data.pitch_name) && interactions.filter_store.includes(data.description) && interactions.filter_store.includes(checkSpeed(data.effective_speed)));
	//$: filtered_pitches = data;


</script>

{#if data.length != 0}
	<Container fluid style="height: 100%; margin: 5px;">
		<Row style="height: 30%;">
			<Col sm='1' style='padding: 20px; max-width: 5%;'>
				<Row>
					<button on:click={vrViewToggle} disabled={vrMode}>Watch</button>
				</Row>
				<Row>
					<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" disabled={vrMode}>Peek</button>
				</Row>
				<Row>
					<button on:click="{() => interaction_store.copy()}" disabled={vrMode}>Copy</button>
				</Row>
				<Row>
					<button on:click={reportToggle} disabled={vrMode}>Report</button>
				</Row>
			

			</Col>
			<Col sm='4' style='padding: 20px; min-width: 35%;'>
				<PitcherCard pitches={data} stats={ohtaniStats} vrMode={vrMode} interactions={interactions}></PitcherCard>
			</Col>
			<Col sm='7' style='padding: 20px; min-width: 60%;'>
				<StatCard stats={ohtaniStats} percentiles={ohtaniPercentile}></StatCard>
			</Col>
		</Row>

		<Row style="height: 35%; text-align: center;">
			<Col  sm='2' style='padding: 20px;'>
				<span>Strike Zone</span>
				<StrikeZone pitches={filtered_pitches} interactions={interactions} vrMode={vrMode}></StrikeZone>
			</Col>
			<Col style='padding: 20px;'>
				<span>Overhead View</span>
				<OverheadPitch data={filtered_pitches} interactions={interactions} vrMode={vrMode}></OverheadPitch>
			</Col>
			<Col style='padding: 20px;'>
				<span>Side View</span>
				<SidePitch data={filtered_pitches} interactions={interactions} vrMode={vrMode}></SidePitch>
			</Col>
		</Row>

		<Row style="height: 35%; text-align: center;">
			
			<Col sm='6' style='padding: 20px;'>
				<span>Pitch Frequency and Speed</span>
				<PitchSpeedFreq pitches={filtered_pitches} data={data} interactions={interactions} vrMode={vrMode}></PitchSpeedFreq>
				
			</Col>
			
			<Col sm='6' style='padding: 20px;'>
				<span>Vertical and Horizontal Break</span>
				<PitchBreak pitches={filtered_pitches} interactions={interactions} vrMode={vrMode}></PitchBreak>
			</Col>
		</Row>
	</Container>


	{#if vrView}
		<VirtualEnvEmbed></VirtualEnvEmbed>
	{/if}

	{#if report}
		<PitcherReport></PitcherReport>
	{/if}

	{#if isVR}
		<div id="circle" style="left: {$mousePos.x}px; top:{$mousePos.y}px"></div>
	{/if}	

{/if}

<style>
	button {
		height: 50px;
		width: 100%;
		font-size: 20px;
	}

	span {
		font-size: 15px;
	}

	#circle{
		position:absolute;
		transform:translate(-50%,-50%);
		height:35px;
		width:35px;
		border-radius:50%;
		border:2px solid rgb(184, 12, 12);
		}

</style>
