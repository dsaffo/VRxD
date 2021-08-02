<script>
	import { Col, Container, Row } from 'sveltestrap';
  import { page, stored_data } from '../stores.js';
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import OverheadPitch from './OverheadPitch.svelte';
	import SidePitch from './SidePitch.svelte';
	import StrikeZone from './StrikeZone.svelte';
  import PitchBreak from './PitchBreak.svelte';
  import PitchSpeedFreq from './PitchSpeedFreq.svelte';
	import { pitch_trajectory }  from '../pitchCalc.js';


  //subscribe to stored_data and assign its value to data
  let data;
  const unsubscribe = stored_data.subscribe(value => {
		data = value;
	});
  //print its result for testing
  //$: console.log(data);

  	let pitch = [];

	let index = 0;

	let start = 0;
	let end = 90;


</script>

{#if data!= null}
	<Container fluid style="height: 100%;">
		<Row style="height: 30%;">
			<Col sm='4'>
				<button on:click="{() => page.update(n => n = 1)}">switch</button>
			</Col>
			<Col sm='8'>
				<OverheadPitch data={data.slice(start,end)}></OverheadPitch>
			</Col>
		</Row>

		<Row style="height: 35%;">
			<Col  sm='2'>
				<StrikeZone pitches={data.slice(start,end)}></StrikeZone>
			</Col>
			<Col>
				<OverheadPitch data={data.slice(start,end)}></OverheadPitch>
			</Col>
			<Col>
				<SidePitch data={data.slice(start,end)}></SidePitch>
			</Col>
		</Row>

		<Row style="height: 35%;">
			<Col  sm='6'>
				<PitchSpeedFreq pitches={data}></PitchSpeedFreq>
			</Col>
			<Col sm='6'>
				<PitchBreak pitches={data}></PitchBreak>
			</Col>
		</Row>
	</Container>
{/if}


