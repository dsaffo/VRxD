<script>
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import { windowSize } from '../viewStore';
 
  export let interactions;
  export let pitches = [];


  
  let innerWidth = 500;
  let innerHeight = 200;
  let width;
  let height;

  export let vrMode = false;

  $: {if (vrMode == false){
    width = innerWidth * 0.50 - 40;
    height = innerHeight * 0.35 - 60;
  } else {
    width = $windowSize.width * 0.50 - 40;
    height = $windowSize.height * 0.35 - 60;
  }
}

  const pitch_types = [...new Set(pitches.map((item) => item.pitch_name))];
  //const yTicks = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90];
  //const xTicks = [-30, -24, -18, -12, -6, 0, 6, 12, 18, 24, 30];
  const yTicks = [-2, -1, 0, 1, 2];
  const xTicks = [-2, -1, 0, 1, 2];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  $: xScale = scaleLinear()
    .domain([-2, 2])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([-2, 2])
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

    {#each pitches as pitch}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <circle
        cx={xScale(pitch.pfx_x)}
        cy={yScale(pitch.pfx_z)}
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
