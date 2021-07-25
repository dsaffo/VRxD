<script>
  	import { page, stored_data } from '../stores.js';
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import TrajectoryChart from './TrajectoryChart.svelte';
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

if (data != null){
	pitch = pitch_trajectory(data[index]['release_pos_x'],data[index]['release_pos_y'],data[index]['release_pos_z'],
							data[index]['vx0'], data[index]['vy0'], data[index]['vz0'],data[index]['ax'],data[index]['ay'],data[index]['az'], 0.001)
}

</script>

<button on:click="{() => page.update(n => n = 1)}">switch</button>

<!--
{#if data!= null}
<div>
	<TrajectoryChart xKey='y' yKey='z' zKey='z' data={pitch_trajectory(data[index]['release_pos_x'],data[index]['release_pos_y'],data[index]['release_pos_z'],
	data[index]['vx0'], data[index]['vy0'], data[index]['vz0'],data[index]['ax'],data[index]['ay'],data[index]['az'], 0.001)}></TrajectoryChart>
	</div>
{/if}
-->
