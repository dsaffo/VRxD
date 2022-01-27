<script>
  import "aframe";
  import { range , extent, ticks } from "d3";
  import { scaleLinear } from "d3-scale";
import { each } from "svelte/internal";
  import { interaction_store, peerInteraction} from "../stores";
  import ScatterPlotVR from "./ScatterPlotVR.svelte";

  export let data;
  export let interactions;

  let width = 6;
  let height = 1;
  const padding = { top: 0.05, right: 0.05, bottom: 0.05, left: 0.05 };

  let dimensions = data["columns"].slice(3);
  let coords = [];
  $: lengthD = interactions.filter_store.length;

  $: xScale = scaleLinear()
      .domain([0, lengthD - 1])
      .range([-width/2, width/2]);

  const xTicks = range(lengthD);

  for (let i = 0; i < dimensions.length; i++){
    let coord = {}
    let dimension = dimensions[i];
    let minMax = extent(data, d => d[dimension]);
    let cData = [];
    let ids = [];

    data.forEach(function(obj){
      cData.push(obj[dimension]);
      ids.push(obj['player_id']);
      coord['yScale'] = scaleLinear()
      .domain([minMax[1],minMax[0]])
      .range([-(height/2), (height/2)]);
      coord['yTicks'] = ticks(minMax[0],minMax[1], 10);
      coord['name'] = dimension;
      coord['data'] = cData;
      coord['ids'] = ids;
    })

    coords[i] = coord;
  }

  let filtered_coords = [];
  let oldFilterStore = [];
  $: {
   
    filtered_coords = [];
    for (let i = 0; i < lengthD; i++){
      filtered_coords.push(coords[dimensions.indexOf(interactions.filter_store[i])]);
    }
  };
</script>

{#each filtered_coords as coords, i}
  <!--<a-plane color="#000000" height="1" width="1" rotation="0 90 0"  position="{xScale(i)} 0 0" material="opacity: 0.2; transparent: true; side: double"></a-plane>-->
  {#if i < lengthD - 1}
  <ScatterPlotVR interactions={interactions} dimension={coords} nextDimension={filtered_coords[interactions.filter_store.indexOf(coords.name) + 1]} pos={xScale(i)} pos2={xScale(i+1)}></ScatterPlotVR>
  {:else}
  <ScatterPlotVR interactions={interactions} dimension={coords} nextDimension={"none"} pos={xScale(i)}></ScatterPlotVR>
  {/if}
{/each}

