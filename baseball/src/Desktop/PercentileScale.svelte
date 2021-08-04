<script>
    import { scaleLinear} from 'd3-scale';
    import {percentileScale, percentileColorScale} from "../colorScales.js";

    let width = 500;
    let height = 100;

    export let percentile = 50;
    export let label = "place holder";

    const padding = {top: 25, right: 15, left: 25};

    const xTicks = [0, 50, 100];

    $: xScale = scaleLinear()
        .domain([0,100])
        .range([padding.left, width - padding.right]);

</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
    <svg>
        <text x={xScale(50)} y={0} text-anchor="middle" fill="white" font-size="1.5vh" dy=".35em">{label}</text>
        <line x1={xScale(0)} y1={padding.top} x2={xScale(100)} y2={padding.top} stroke="white"></line>
        <circle r="5" cx={xScale(0)} cy={padding.top} fill="white"></circle>
        <circle r="5" cx={xScale(50)} cy={padding.top} fill="white"></circle>
        <circle r="5" cx={xScale(100)} cy={padding.top} fill="white"></circle>
        <g>
            <circle r="10" cx={xScale(percentile)} cy={padding.top} fill={percentileColorScale(percentileScale(percentile))}></circle>
            <text class="text" x={xScale(percentile)} y={padding.top} text-anchor="middle" fill="white" font-size="1vh" dy=".35em">{percentile}</text>
        </g>
    </svg>

</div>

<style>
    .chart{
    width: 100%;
    height: 100%;
    max-height: 4vh;
    }

    svg {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .text {
    paint-order: stroke;
    stroke: #000000;
    stroke-width: 4px;
    stroke-linecap: butt;
    stroke-linejoin: miter;
    font-weight: 400;
}
</style>

