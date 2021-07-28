<script>
  import { scaleLinear } from 'd3-scale';
	import { pitch_trajectory }  from '../pitchCalc.js';



  export let data = []; 
  let width = 500;
	let height = 200;

  const yTicks = [2, 1, 0, -1, -2];
	const xTicks = [0, 10, 20, 30, 40, 50, 60];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };



  $: xScale = scaleLinear()
		.domain([0, 60])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([-2, 2])
		.range([padding.top, height - padding.bottom, ]);



  $: pathGen = function(data){

    var pitch = pitch_trajectory(data['release_pos_x'],data['release_pos_y'],data['release_pos_z'],
	  						data['vx0'], data['vy0'], data['vz0'],data['ax'],data['ay'],
                data['az'],data['release_spin_rate'],0.001);

    //convert from meters to feet and flip x position to pitchers persepctive
    return `M${pitch.map(p => `${xScale(p.y * 3.28084)},${yScale(p.x * 3.28084)}`).join('L')}`

  }

  function formatMobile (tick) {
		return "'" + tick.toString().slice(-2);
  }
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

    <!-- Pitching Mound -->
    <rect width={xScale(0.1)} height={yScale(-0.3)} x={xScale(60)} y={yScale(-1)} fill='#ccd5e3'></rect>

    <!-- home plate  -->
    <rect width={xScale(0.01)} height={yScale(-0.8636)} x={xScale(0)} y={yScale(-0.75)} fill='#ccd5e3'></rect>

		<!-- data -->
    {#each data as pitch}
		  <path class="path-line" d={pathGen(pitch)}></path>
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
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
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
		stroke: rgb(0,100,100);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>