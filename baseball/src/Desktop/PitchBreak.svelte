<script>
  import { scaleLinear, scaleOrdinal} from 'd3-scale';
  import {schemeTableau10} from 'd3-scale-chromatic';

  export let pitches = []; 

  let width = 500;
  let height = 200;

  const pitch_types = [...new Set(pitches.map(item => item.pitch_name))];
  const yTicks = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90];
  const xTicks = [-30, -24, -18, -12, -6, 0, 6, 12, 18, 24, 30];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  $: xScale = scaleLinear()
        .domain([-30, 30])
        .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
        .domain([90, 0])
        .range([height - padding.bottom, padding.top]);

    let colorScale = scaleOrdinal(schemeTableau10);
  
  </script>
  
  
  <div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
      <svg>
          <!-- y axis -->
          <g class="axis y-axis" transform="translate(0, {padding.top})">
              {#each yTicks as tick}
                  <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
                      <line x2="100%"></line>
                      <text y="-4">{tick}</text>
                  </g>
              {/each}
          </g>
  
          <!-- x axis -->
          <g class="axis x-axis">
              {#each xTicks as tick}
                  <g class="tick tick-{ tick }" transform="translate({xScale(tick)},{height})">
                      <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0"></line>
                      <text y="-2">{tick}</text>
                  </g>
              {/each}
          </g>
  
      {#each pitches as pitch}
        <circle cx={xScale(pitch.pfx_x * 12)} cy={yScale((pitch.release_pos_z * 39.3701) - (pitch.plate_z * 39.3701))} r="5" fill={pitch.color} opacity='0.8'></circle>
      {/each}
			
      </svg>
  </div>
  
  <style>
      .chart, h2, p {
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
          font-size: .725em;
          font-weight: 200;
      }
  
      .tick line {
		stroke:  rgb(255, 255, 255);
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