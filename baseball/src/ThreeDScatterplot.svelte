<script>
	import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { extent } from "d3-array";
	import * as aframe from "aframe";
	import * as aframeevent from "aframe-event-set-component";
  import { stored_data } from "./stores";
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';

	const height = 2;
	const width = 2;
	const depth = 2;
	const padding = 10;
	const colors = ["red", "green", "blue"];
	const axisSpace = 50;

	export let xKey;
	export let yKey;
	export let zKey;
	export let colorKey;
	export let data; 

	let xExtent = extent(data, (d) => d[xKey]);
	let yExtent = extent(data, (d) => d[yKey]);
	let zExtent = extent(data, (d) => d[zKey]);
	  

	let species = new Set(data.map((d) => d[colorKey]));
	species = [...species];

	let xScale = scaleLinear()
    .domain(xExtent)
		.range([0, width]);
			
	let yScale = scaleLinear()
    .domain(yExtent)
		.range([0, height]);

	let zScale = scaleLinear()
		.domain(zExtent)
		.range([0, depth]);
			
	let colorScale = scaleOrdinal().domain(Array.from(species)).range(colors);

	let radius = function(selected){ 
		if (selected === false){
			return "0.03";
		} else {
			return "0.10";
		}
	}

	function selection(index){
		stored_data.updateData(index);
	}


 

	//{d[xKey]} {d[yKey]} {d[zKey]}
</script>

{#each data as d, i}
	<a-sphere position="{xScale(d[xKey])} {yScale(d[yKey])} {zScale(d[zKey])}" radius="{radius(d.selected)}" color="{colorScale(d[colorKey])}"
on:mouseenter="{() => selection(i)}" on:mouseleave="{() => selection(i)}"></a-sphere>
{/each}
<a-plane position="{width / 2} 0 {depth / 2}" rotation="-90 0 0" width="{width}" height="{height}" color="#7BC8A4"></a-plane>
	



	

