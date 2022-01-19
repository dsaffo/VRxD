<script>
import { scaleLinear } from "d3-scale";
import { range , extent, ticks } from "d3";

export let data = [];
export let interactions;
export let vrMode = false;

let width = 500;
let height = 500;
const padding = { top: 20, right: 15, bottom: 20, left: 25 };

let dimensions = data["columns"].slice(4);
let coords = [];

console.log(dimensions);

$: xScale = scaleLinear()
    .domain([0, dimensions.length])
    .range([padding.left, width - padding.right]);

const xTicks = range(dimensions.length);

$: for (let i = 0; i < dimensions.length; i++){
  let coord = {}
  let dimension = dimensions[i];
  let minMax = extent(data, d => d[dimension]);

  coord['name'] = dimension;
  coord['yScale'] = scaleLinear()
    .domain([minMax[1],minMax[0]])
    .range([padding.top, height - padding.bottom]);
  coord['yTicks'] = ticks(minMax[0],minMax[1], 10);

  coords[i] = coord;
}

console.log(coords);

</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
  <svg>
    {#each coords as coord, i}
    <g>
      <line class="coord" y1={padding.top} y2={height - padding.bottom} x1={xScale(i)} x2={xScale(i)}/>
      {#each coord.yTicks as tick}
        <text class="tick" y={coord.yScale(tick)} x={xScale(i)}>{tick}</text>
      {/each}
    </g>

    {#each data as d}
      {#if i < data.length - 1}
      <line stroke="white" x1={xScale(i)} y1={coord.yScale(d[coord.name])} x2={xScale(i+1)} y2={coords[i+1].yScale(d[coords[i + 1].name])}>
      </line>

      <circle r="2" stroke="white" fill="white" cx={xScale(i)} cy={coord.yScale(d[coord.name])}>
      </circle>
      {/if}
    {/each}

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

  .x-axis .tick text {
    text-anchor: middle;
  }
</style>