<script>
  import { scaleLinear } from "d3-scale";
  import { pitch_trajectory } from "../pitchCalc.js";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";

  export let data = [];

  export let interactions;

  let innerWidth = 500;
  let innerHeight = 200;

  $: width = innerWidth * 0.40 - 40;
  $: height = innerHeight * 0.35 - 60;

  const yTicks = [0, 2, 4, 6];
  const xTicks = [0, 10, 20, 30, 40, 50, 60];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  $: xScale = scaleLinear()
    .domain([0, 60])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([0, 7])
    .range([height - padding.bottom, padding.top]);

  $: pathGen = function (data) {
    var pitch = pitch_trajectory(
      data["release_pos_x"],
      data["release_pos_y"],
      data["release_pos_z"],
      data["vx0"],
      data["vy0"],
      data["vz0"],
      data["ax"],
      data["ay"],
      data["az"],
      data["release_spin_rate"],
      0.001
    );

    //convert from meters to feet
    return `M${pitch
      .map((p) => `${xScale(p.y * 3.28084)},${yScale(p.z * 3.28084)}`)
      .join("L")}`;
  };

  $: stroke = (id) => {

    if (interactions.hover_store == id || $peerInteraction.hover_store == id){
      return "8"
    } 
    return "2"
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

  function mouseOver(id){
    interaction_store.updateLocalHover(id);
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

    <!-- Pitching Mound -->
    <rect
      width={xScale(0.1)}
      height="5"
      x={xScale(60)}
      y={yScale(0.1)}
      fill="#ccd5e3"
    />

    <!-- home plate  -->
    <rect
      width={xScale(0.01)}
      height="5"
      x={xScale(0)}
      y={yScale(0.1)}
      fill="#ccd5e3"
    />

    <!-- Strike Zone  -->
    <rect
      width={xScale(0.01)}
      height={yScale(4)}
      x={xScale(0)}
      y={yScale(3.8)}
      fill="#ccd5e3"
    />

    <!-- data -->
    {#each data as pitch}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <path
        class="path-line"
        d={pathGen(pitch)}
        stroke={colorScale(interactions.color_store, pitch)}
        opacity={opacity(pitch.id)}
        stroke-width={stroke(pitch.id)}
        on:mouseover={() => mouseOver(pitch.id)}
        on:mouseout={() => mouseOut()}
      />
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
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
