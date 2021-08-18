<script>
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction } from "../stores";
  import { colorScale } from "../colorScales";

  export let pitches = [];

  export let interactions;


  let innerWidth = 500;
  let innerHeight = 200;

  $: width = innerWidth * 0.165 - 40;
  $: height = innerHeight * 0.35 - 60;

  const yTicks = [0, 1, 2, 3, 4];
  const xTicks = [-1, 0, 1];
  const padding = { top: 20, right: 15, bottom: 20, left: 15 };

  $: xScale = scaleLinear()
    .domain([-1.8, 1.8])
    .range([padding.left, width - padding.right]);

  $: xScale2 = scaleLinear()
    .domain([0, 3.6])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([0, 4])
    .range([height - padding.bottom, padding.top]);


  $: radius = (id) => {
    if (interactions.hover_store == id || $peerInteraction.hover_store == id){
      return "10"
    } 
    return "5"
  }

  $: opacity = (id) => {
    if (interactions.hover_store == id){
      return "1"
    } 
    else if (interactions.hover_store == null){
      return "0.8"
    }

    return "0.1"
  }

  function mouseOver(index){
    interaction_store.updateLocalHover(index);
  }

  function mouseOut(){
    interaction_store.updateLocalHover(null);
  }

</script>


<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>

<div class="chart">
  <svg>
    <!-- y axis -->
    <g class="axis y-axis" transform="translate(0, {padding.top})">
      {#each yTicks as tick}
        <g
          class="tick tick-{tick}"
          transform="translate(0, {yScale(tick) - padding.bottom})"
        >
          <line x2="100%" />
          <text y="-4">{tick}ft</text>
        </g>
      {/each}
    </g>

    <!-- x axis -->
    <g class="axis x-axis">
      {#each xTicks as tick}
        <g
          class="tick tick-{tick}"
          transform="translate({xScale(tick)},{height})"
        >
          <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0" />
          <text y="-2">{tick}ft</text>
        </g>
      {/each}
    </g>

    <rect
      width={xScale2(1.6) - xScale2(0)}
      height={yScale(2.15) - yScale(4)}
      x={xScale2(2 / 2)}
      y={yScale(3.2)}
      fill="none"
      stroke="red"
    />

    {#each pitches as pitch}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <circle
        cx={xScale(pitch.plate_x * 3.2808)}
        cy={yScale(pitch.plate_z * 3.2808)}
        fill={colorScale(interactions.color_store, pitch)}
        r={radius(pitch.id)}
        opacity={opacity(pitch.id)}
        on:mouseover={() => mouseOver(pitch.id)}
        on:mouseout={() => mouseOut()}
      />
    {/each}
  </svg>
</div>

<style>
  .chart{
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

  .tick line {
    stroke: rgb(255, 255, 255);
    stroke-dasharray: 2;
  }

  .tick text {
    fill: rgb(255, 255, 255);
    text-anchor: start;
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
  }

  .x-axis .tick text {
    text-anchor: middle;
  }

  .path-line {
    fill: none;
    stroke: rgb(0, 100, 100);
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }
</style>
