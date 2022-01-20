<script>
import { scaleLinear } from "d3-scale";
import { range , extent, ticks } from "d3";
import { interaction_store } from "../../../baseball/src/stores";
import { beforeUpdate, afterUpdate } from 'svelte';
import {flip} from 'svelte/animate';

export let data = [];
export let interactions;
export let vrMode = false;

let width = 500;
let height = 500;
const padding = { top: 20, right: 40, bottom: 40, left: 40 };

let dimensions = data["columns"].slice(4);
let coords = [];
$: lengthD = interactions.filter_store.length;

console.log(dimensions);

$: xScale = scaleLinear()
    .domain([0, lengthD - 1])
    .range([padding.left, width - padding.right]);

const xTicks = range(lengthD);

$: for (let i = 0; i < dimensions.length; i++){
  let coord = {}
  let dimension = dimensions[i];
  let minMax = extent(data, d => d[dimension]);
  let cData = [];
  data.forEach(function(obj){
    cData.push(obj[dimension]);

  coord['name'] = dimension;
  coord['yScale'] = scaleLinear()
    .domain([minMax[1],minMax[0]])
    .range([padding.top, height - padding.bottom]);
  coord['yTicks'] = ticks(minMax[0],minMax[1], 10);
  coord['data'] = cData;

  
})

  coords[i] = coord;
}


let filtered_coords = [];
let oldFilterStore = [];
$: {
  /*
  if (lengthD > oldFilterStore.length){
    let difference = interactions.filter_store.filter(x => !oldFilterStore.includes(x));
    for (let i = 0; i < difference.length; i++){
      filtered_coords.push(coords[dimensions.indexOf(difference[i])]);
      //console.log(filtered_coords);
    }
  } else if (lengthD < oldFilterStore.length){
    let difference = oldFilterStore.filter(x => !interactions.filter_store.includes(x));
   // console.log(difference.length, difference)
    for (let i = 0; i < difference.length; i++){
      filtered_coords.splice(oldFilterStore.indexOf(difference[i]), 1);
     // console.log(filtered_coords);
    }
  }
  */
  filtered_coords = [];
  for (let i = 0; i < lengthD; i++){
    filtered_coords.push(coords[dimensions.indexOf(interactions.filter_store[i])]);
  }
  
  //oldFilterStore = interactions.filter_store.slice(0);
  console.log(filtered_coords);
};



</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
  <svg>
    {#each filtered_coords as coord, i (coord)}
    <g>
      <g>
        <line id={coord.name} class="coord" y1={padding.top} y2={height - padding.bottom} x1={xScale(i)} x2={xScale(i)}/>
        {#each coord.yTicks as tick}
          <text class="tick" y={coord.yScale(tick)} x={xScale(i)}>{tick}</text>
        {/each}
        <text class="label" y={height - 20} x={xScale(i)}>{coord.name}</text>
      </g>
   

      {#each coord.data as d, j}
        {#if i < lengthD - 1}
        <line stroke="white" x1={xScale(i)} y1={coord.yScale(d)} x2={xScale(i+1)} y2={filtered_coords[i+1].yScale(filtered_coords[i + 1].data[j])}>
        </line>
        {/if}

        <circle r="2" stroke="white" fill="white" cx={xScale(i)} cy={coord.yScale(d)}>
        </circle>
      {/each}
    </g>
    {/each}
  </svg>
</div>

<style>
  .chart {
    width: 100%;
    height: 100%;
  }

  svg {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .tick {
    font-size: 0.725em;
    font-weight: 200;
  }

  .coord {
    stroke: rgb(255, 255, 255);
    stroke-dasharray: 2;
  }

  .tick {
    fill: rgb(255, 255, 255);
    text-anchor: start;
  }

  .label {
    fill: rgb(255, 255, 255);
    text-anchor: middle;
  }

</style>