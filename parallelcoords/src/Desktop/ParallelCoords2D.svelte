<script>
import { fade, fly } from 'svelte/transition';
import { scaleLinear } from "d3-scale";
import { range , extent, ticks } from "d3";
import { interaction_store} from "../stores";
import { colorScale } from "../colorScales";

export let data = [];
export let interactions;
export let vrMode = false;

let m = { x: 0, y: 0 };

function handleMousemove(event) {
  m.x = event.clientX;
  m.y = event.clientY;
}

let width = 500;
let height = 500;
const padding = { top: 40, right: 40, bottom: 40, left: 40 };

let dimensions = data["columns"].slice(3);
let coords = [];
$: lengthD = interactions.filter_store.length;

$: xScale = scaleLinear()
    .domain([0, lengthD - 1])
    .range([padding.left, width - padding.right]);

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
  coord['yScale'] = scaleLinear()
    .domain([minMax[1],minMax[0]])
    .range([padding.top, height - padding.bottom]);
  coord['yTicks'] = ticks(minMax[0],minMax[1], 10);
  coord['data'] = cData;
  coord['ids'] = ids;

  
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
  //console.log(filtered_coords);
};

$: strokeWidth = (id) => {
    if (interactions.hover_store == id) {
    return "8";
  }
  return "3";
}

$: radius = (id) => {
    if (interactions.hover_store == id) {
    return "8";
  }
  return "3";
}

$: strokeOpacity = (id) => {
    if (interactions.hover_store == id){
      return "1"
    } 
    else if (interactions.hover_store == null){
      return "0.8"
    }
    return "0.1"
  }

$: index = data.findIndex(object => {
  return object.player_id == interactions.hover_store;
});

$: player = data[index];

$: visible = (index === -1) ? false : true;

function mouseOver(index){
  interaction_store.updateLocalHover(index);
}

function mouseOut(){
  interaction_store.updateLocalHover(null);
}

</script>

<div class="chart" on:mousemove={handleMousemove} bind:clientWidth={width} bind:clientHeight={height}>
  <svg>
    {#each filtered_coords as coord, i (coord)}
      
    <g>
      <g>
        <line id={coord.name} class="coord" y1={padding.top} y2={height - padding.bottom} x1={xScale(i)} x2={xScale(i)}/>
        <text class="label" y={height - 20} x={xScale(i)}>{coord.name}</text>
      </g>
   

      {#each coord.data as d, j}
        {#if i < lengthD - 1}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <line stroke={colorScale(interactions.color_store, filtered_coords, i, j)} 
              stroke-width={strokeWidth(coord.ids[j])}
              stroke-opacity={strokeOpacity(coord.ids[j])}
              x1={xScale(i)} 
              y1={coord.yScale(d)} 
              x2={xScale(i+1)} 
              y2={filtered_coords[i+1].yScale(filtered_coords[i + 1].data[j])}
              on:mouseover={() => mouseOver(coord.ids[j])}
              on:mouseout={() => mouseOut()}>
        </line>
        {/if}

        

        <circle r={radius(coord.ids[j])} opacity={strokeOpacity(coord.ids[j])} stroke="white" fill="white" cx={xScale(i)} cy={coord.yScale(d)}>
        </circle>
      {/each}
    </g>

    {#each coord.yTicks as tick}
      <text class="tick" y={coord.yScale(tick)} x={xScale(i)}>{tick}</text>
    {/each}

    {/each}
  </svg>

  {#if visible}
  <div class="flex" style="transform: translate3d({m.x}px, {m.y - height}px, 0px);" out:fade>
    {#if index === -1}
      <div>Player Name: Hover line to display stats</div>
    {:else}
    <div style="margin-bottom: 5px; display:flex; flex-flow: row wrap; width: 100%;">
      <div style="font-size: medium; font-weight: bold;">{player.first_name} {player.last_name}</div>
    </div>
    {#each interactions.filter_store as coord}    
    <div style="margin-bottom: 2px; display:flex; flex-flow: row; width: 100%;">
      <div style="width: 50%;">{coord}:</div>
      <div style="width: 50%;  text-align:right;">{player[coord]}</div>
      </div>
    {/each}
    {/if}
  </div>
  {/if}
</div>

<style>
  .flex {
    border: 2px solid white;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.80);
    position: absolute;
    padding: 10px;
    height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column; 
    flex-wrap:wrap;
  }


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
    font-size: 1.2em;
    paint-order: stroke;
    stroke: #000000;
    stroke-width: 1px;
    stroke-linecap: butt;
    stroke-linejoin: miter;
    font-weight: 250;
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