<script>
	import { Col, Container, Row } from 'sveltestrap';
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
	<Container id="capture" fluid style="height: 100%; margin: 5px;">
		<Row style="height: 2%; text-align: center;">
			<Col sm='1' style='padding: 20px; max-width: 5%;'>
				
			</Col>
			<Col sm='4' style='padding: 20px; min-width: 35%;'>
				<span>Pitcher Details and Dashboard Controls</span>
				</Col>
				<Col sm='7' style='padding: 20px; min-width: 60%;'>
					<span>Pitcher Stats and Performance Percentile</span>
				</Col>
		</Row>
		<Row style="height: 28%;">
			<Col sm='1' style='padding: 20px; max-width: 5%;'>
				<Row>
					<button on:click={vrViewToggle} disabled={vrMode}>Watch</button>
				</Row>
				<Row>
					<button on:mousedown="{() => interaction_store.peekStart()}" on:mouseup="{() => interaction_store.peekEnd()}" on:mouseleave="{() => interaction_store.peekEnd()}" disabled={vrMode}>Peek</button>
				</Row>
				<Row>
					<button on:click="{() => interaction_store.copy()}" disabled={vrMode}>Copy</button>
				</Row>
				<Row>
					<button on:click={reportToggle} disabled={vrMode}>Report</button>
				</Row>
				<Row>
					<div class="play-btn">
						  <svg id="pitch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
							<polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
							<path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
						  </svg> 
					  </div>
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
				<span>Pitch Overhead View</span>
				<OverheadPitch data={data} interactions={interactions} vrMode={vrMode} filtered={filtered_pitches.map(a => a.id)}></OverheadPitch>
			</Col>
			<Col style='padding: 20px;'>
				<span>Pitch Side View</span>
				<SidePitch data={data} interactions={interactions} vrMode={vrMode} filtered={filtered_pitches.map(a => a.id)}></SidePitch>
			</Col>
		</Row>

		<Row style="height: 35%; text-align: center;">
			
			<Col sm='6' style='padding: 20px;'>
				<span>Pitch Frequency and Speed</span>
				<PitchSpeedFreq pitches={filtered_pitches} data={data} interactions={interactions} vrMode={vrMode}></PitchSpeedFreq>
				
			</Col>
			
			<Col sm='6' style='padding: 20px;'>
				<span>Vertical/Horizontal Break From a Straight Line</span>
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





	

{/if}

<style>
	button {
		height: 35px;
		width: 100%;
		font-size: medium;
	}

	span {
		font-size: medium;
	}

	.play-btn {
  width: 50%;
  height: auto;
  margin: 0 auto;
  margin-top: 10%;
}

.play-btn__svg{
  transition: 0.5s; 
  fill:#7c7c7c; 
  opacity: .5;
}

.play-btn:hover .play-btn__svg {
  fill: #a41d33;
  opacity: 1;
}

</style>
