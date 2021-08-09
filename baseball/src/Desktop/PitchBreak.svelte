<script>
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";

  let interactions;

  const unsubscribe = interaction_store.subscribe((value) => {
    interactions = value;
  });

  export let pitches = [];


  
  let innerWidth = 500;
  let innerHeight = 200;

  $: width = innerWidth * 0.50 - 40;
  $: height = innerHeight * 0.35 - 40;

  const pitch_types = [...new Set(pitches.map((item) => item.pitch_name))];
  const yTicks = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90];
  const xTicks = [-30, -24, -18, -12, -6, 0, 6, 12, 18, 24, 30];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  $: xScale = scaleLinear()
    .domain([-30, 30])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([90, 0])
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
          <text y="-4">{tick}</text>
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
          <text y="-2">{tick}</text>
        </g>
      {/each}
    </g>

    {#each pitches as pitch}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <circle
        cx={xScale(pitch.pfx_x * 12)}
        cy={yScale(pitch.release_pos_z * 39.3701 - pitch.plate_z * 39.3701)}
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
    overflow: visible;
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
</style>
