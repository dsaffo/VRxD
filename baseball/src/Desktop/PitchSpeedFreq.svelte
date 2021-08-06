<script>
  import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { interaction_store } from "../stores";
  import { colorScale } from "../colorScales";

  export let pitches = [];
  export let data = [];

  let interactions;

  const unsubscribe = interaction_store.subscribe((value) => {
    interactions = value;
  });

  let width = 500;
  let height = 200;

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
</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
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
          <text y="-2">{tick}</text>
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
      {/each}
    </g>

    <g class="Pitch_Speed_Dot">
      {#each pitches as pitch}
        <circle
          r="5"
          cx={xScale(pitch.effective_speed)}
          cy={yScale(pitch.pitch_name) + 10}
          fill={colorScale(interactions.color_store, pitch)}
          opacity="0.6"
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
  .chart,
  h2,
  p {
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
