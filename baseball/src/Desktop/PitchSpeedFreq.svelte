<script>
    import { scaleLinear, scaleOrdinal, scaleBand} from 'd3-scale';
  
    export let pitches = []; 
  
    let width = 500;
    let height = 200;

		//get unique pitch types
  
    const yTicks = ["Four-Seam Fastball", "Split-Finger", "Slider", "Cutter", "Curveball"];
    const xTicks = [70, 80, 90, 100];
    const padding = { top: 20, right: 15, bottom: 20, left: 200 };
  
    $: xScale = scaleLinear()
    	.domain([70,100])
      .range([padding.left, width - padding.right]);

		$: xScale2 = scaleLinear()
			.domain([0,100])
			.range([padding.left, 0]);
  
    $: yScale = scaleBand()
			.domain(yTicks)
      .range([padding.top, height - padding.bottom]);

		let pitchFreq = [];

		let pitchSpeed = [];

		//calc % of thrown pitch types


		//calc average pitch speed per type



    </script>
    
    
    <div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
        <svg>
        		<!-- y axis -->
            <g class="axis y-axis" transform="translate(0, {padding.top})">
                {#each yTicks as tick}
                    <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
                        <line x2="100%"></line>
                        <text y="-4" x="195">{tick}</text>
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

					<rect height="20" width={xScale2(0) - xScale2(100)} x={xScale2(100)} y={yScale('Four-Seam Fastball')} fill='red'></rect>


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
            stroke: rgb(0,100,100);
            stroke-linejoin: round;
            stroke-linecap: round;
            stroke-width: 2;
        }
    </style>