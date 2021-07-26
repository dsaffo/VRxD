<script>
	import { Col, Container, Row } from 'sveltestrap';
  import { page, stored_data } from '../stores.js';
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import OverheadPitch from './OverheadPitch.svelte';
	import SidePitch from './SidePitch.svelte';
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



</script>




{#if data!= null}
	<Container fluid style="height: 100%;">
		<Row style="height: 30%;">
			<Col sm='4'>
				<button on:click="{() => page.update(n => n = 1)}">switch</button>
			</Col>
			<Col sm='8'>
				<OverheadPitch data={[data[0]]}></OverheadPitch>
			</Col>
		</Row>

		<Row style="height: 30%;">
			<Col  sm='2'>Strike Zone</Col>
			<Col  >
				<OverheadPitch data={[data[0],data[1],data[2],data[3]]}></OverheadPitch>
			</Col>
			<Col >
				<SidePitch data={[data[0],data[1],data[2],data[3]]}></SidePitch>
			</Col>
		</Row>

		<Row style="height: 40%;">
			<Col  sm='6'>
				<OverheadPitch data={[data[0]]}></OverheadPitch>
			</Col>
			<Col sm='6'>
				<OverheadPitch data={[data[0]]}></OverheadPitch>
			</Col>
		</Row>
	</Container>
{/if}


