<script>
  import "aframe";
  import { range , extent, ticks } from "d3";
  import { scaleLinear } from "d3-scale";
import { each } from "svelte/internal";
  import { interaction_store, peerInteraction} from "../stores";
  import ScatterPlotVR from "./ScatterPlotVR.svelte";

  export let data;
  export let interactions;

  let width = 10;
  let height = 1;
  const padding = { top: 0.05, right: 0.05, bottom: 0.05, left: 0.05 };

  let dimensions = data["columns"].slice(3);
  let coords = [];
  $: lengthD = interactions.filter_store.length;

  $: xScale = scaleLinear()
      .domain([0, lengthD - 1])
      .range([-width/2, width/2]);

  const xTicks = range(lengthD);

  $: for (let i = 0; i < dimensions.length; i++){
    let coord = {}
    let dimension = dimensions[i];
    let minMax = extent(data, d => d[dimension]);
    let cData = [];
    let ids = [];

    data.forEach(function(obj){
      cData.push(obj[dimension]);
      ids.push(obj['player_id']);
      coord['name'] = dimension;
      coord['data'] = cData;
      coord['ids'] = ids;
    })

    coords[i] = coord;
  }

  let filtered_coords = [];

  $: {
    filtered_coords = [];
    for (let i = 0; i < lengthD; i++){
      filtered_coords.push(coords[dimensions.indexOf(interactions.filter_store[i])]);
    }
  };
</script>

{#each filtered_coords as coords, i}
  <!--<a-plane color="#000000" height="1" width="1" rotation="0 90 0"  position="{xScale(i)} 0 0" material="opacity: 0.2; transparent: true; side: double"></a-plane>-->
<a-entity rotation="0 90 0"  position="{xScale(i)} 0 0">
  <ScatterPlotVR dimension={coords}></ScatterPlotVR>
</a-entity>

{/each}

