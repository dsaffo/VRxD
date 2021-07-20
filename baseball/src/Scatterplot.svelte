<script>
	import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { extent } from "d3-array";
	import { stored_data } from './stores.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const height = 600;
	const width = 700;
	const padding = 10;
	const colors = ["red", "green", "blue"];
	const axisSpace = 50;

	export let xKey;
	export let yKey;
	export let zKey;
	export let data; 

	let xExtent = extent(data, (d) => d[xKey]);
  let yExtent = extent(data, (d) => d[yKey]);

	let species = new Set(data.map((d) => d[zKey]));
	species = [...species];

	let xScale = scaleLinear()
      .domain(xExtent)
			.range([padding + axisSpace, width - padding]);
			
  let yScale = scaleLinear()
      .domain(yExtent)
			.range([height - padding - axisSpace, padding]);
			
	let colorScale = scaleOrdinal().domain(Array.from(species)).range(colors);

	let radius = function(selected){ 
		if (selected === false){
			return "6";
		} else {
			return "15";
		}
	}


	function selection(index) {
		stored_data.updateData(index);
	}

</script>

<svg {height} {width}>
	{#each data as d, i}
		<circle
			r={radius(d.selected)}
			cx={xScale(d[xKey])}
			cy={yScale(d[yKey])}
			fill={colorScale(d.class)}
			on:mouseover={() => {selection(i)}}
			on:mouseout={() => {selection(i)}}
		/>
	{/each}

	{#each xScale.ticks(5) as tick}
	<g transform={`translate(${xScale(tick)} ${height - 20})`}>
			<line y1="-5" y2="0" stroke="black" />
      <text y="20" text-anchor="middle">{tick}</text>
		</g>
	{/each}

	{#each yScale.ticks(5) as tick}
	<g transform={`translate(0 ${yScale(tick)})`}>
		<line x1="35" x2="40" stroke="black" />
		<text x="30" dominant-baseline="middle" text-anchor="end">{tick}</text>
	</g>
{/each}

<g transform={`translate(${width - 130}, ${height - 100})`}>
	{#each species as species, i}
		<g transform={`translate(0 ${i * 20})`}>
			<rect height="10" width="10" fill={colorScale(species)} />
			<text dominant-baseline="middle" y="5" x="20">{species}</text>
		</g>
	{/each}
</g>

</svg>

	

