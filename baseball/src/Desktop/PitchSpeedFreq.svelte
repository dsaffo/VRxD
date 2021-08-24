<script>
  import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import { windowSize } from '../viewStore';

  export let pitches = [];
  export let data = [];

  export let interactions;

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



  //get unique pitch types

  const yTicks = [...new Set(data.map((item) => item.pitch_name))];
  const xTicks = [60, 70, 80, 90, 100];
  const padding = { top: 20, right: 15, bottom: 20, left: 200 };

  $: xScale = scaleLinear()
    .domain([60, 100])
    .range([padding.left, width - padding.right]);

  $: xScale2 = scaleLinear().domain([0, 100]).range([padding.left, 0]);

  $: yScale = scaleBand()
    .domain(yTicks)
    .range([padding.top, height - padding.bottom]);

  let barColors = scaleOrdinal(schemeTableau10);

  let pitchData = [];

  //calc total, %, speed of thrown pitch types
  for (let i = 0; i < yTicks.length; i++) {
    var total = 0;
    var speed = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j]["pitch_name"] === yTicks[i]) {
        total += 1;
        speed += data[j]["effective_speed"];
      }
    }
    pitchData.push({
      pitch: yTicks[i],
      volume: total,
      percent: (total / data.length) * 100,
      speed: speed / total,
    });
  }

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
          <line y1="10" y2="10" x2="100%" />
          <text y="-4" x="195">{tick}</text>
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
          <text y="-2">{tick}mph</text>
        </g>
      {/each}
    </g>

    <g class="Freq_Bar">
      {#each pitchData as pitch}
        <rect
          height="20"
          width={xScale2(0) - xScale2(pitch.percent)}
          x={xScale2(pitch.percent)}
          y={yScale(pitch.pitch)}
          fill={barColors(yTicks.indexOf(pitch.pitch))}
        />

        <text 
        x={xScale2(pitch.percent)}
        y={yScale(pitch.pitch) + 15}
        fill="white"
        font-size="12px"
        >
        {parseInt(pitch.percent)}%</text>
      {/each}
    </g>

    <g class="Pitch_Speed_Dot"> 
      {#each pitches as pitch}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <circle
          cx={xScale(pitch.effective_speed)}
          cy={yScale(pitch.pitch_name) + 10}
          fill={colorScale(interactions.color_store, pitch)}
          r={radius(pitch.id)}
          opacity={opacity(pitch.id)}
          on:mouseover={() => mouseOver(pitch.id)}
          on:mouseout={() => mouseOut()}
         
        />
      {/each}
    </g>

    <g class="Avg_Speed_Bar">
      {#each pitchData as pitch}
        <rect
          height="20"
          width="3"
          x={xScale(pitch.speed)}
          y={yScale(pitch.pitch)}
          fill="grey"
        />
      {/each}
    </g>
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
    text-anchor: end;
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
