<script>
  import { scaleLinear } from "d3-scale";
  import { pitch_trajectory } from "../pitchCalc.js";
	import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import simplify from "simplify-3d";
  import { windowSize } from '../viewStore';

  export let data = [];
	export let interactions;
  export let filtered = [];
 
 
  let innerWidth = 500;
  let innerHeight = 200;
  let width;
  let height;

  export let vrMode = false;

  $: {if (vrMode == false){
    width = innerWidth * 0.40 - 40;
    height = innerHeight * 0.35 - 60;
  } else {
    width = $windowSize.width * 0.40 - 40;
    height = $windowSize.height * 0.35 - 60;
  }
}

  const yTicks = [2, 1, 0, -1, -2];
  const xTicks = [0, 10, 20, 30, 40, 50, 60];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  $: xScale = scaleLinear()
    .domain([0, 60])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([-2, 2])
    .range([padding.top, height - padding.bottom]);


  let pitchPaths = {}
  for (let i =0; i < data.length; i++){
      var pitch = pitch_trajectory(
        data[i]["release_pos_x"],
        data[i]["release_pos_y"],
        data[i]["release_pos_z"],
        data[i]["vx0"],
        data[i]["vy0"],
        data[i]["vz0"],
        data[i]["ax"],
        data[i]["ay"],
        data[i]["az"],
        data[i]["release_spin_rate"],
        0.001
      );
      let id = data[i]['id'];
      pitch = pitch.map(p => { return {x: p.x, y: p.y, z: p.z, t: p.t}});
      pitch = simplify(pitch, 0.01);
      pitchPaths[id] = pitch;
  }
    

  $: pathGen = function (id) {
    //convert from meters to feet and flip x position to pitchers persepctive
    return `M${pitchPaths[id]
      .map((p) => `${xScale(p.y * 3.28084)},${yScale(p.x * 3.28084)}`)
      .join("L")}`;
  };

  $: pitchTime = function (id) {
    return pitchPaths[id][pitchPaths[id].length - 1].t;
  }

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

  $: display = function(id) {
        if (filtered.includes(id)){
            return ""
        } 
        return "none"
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
      height={yScale(-0.3)}
      x={xScale(60)}
      y={yScale(-1)}
      fill="#ccd5e3"
    />

    <!-- home plate  -->
    <rect
      width={xScale(0.01)}
      height={yScale(-0.8636)}
      x={xScale(0)}
      y={yScale(-0.75)}
      fill="#ccd5e3"
    />

    <!-- data -->
    {#each data as pitch}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <path
        id="overpitch{pitch.id}"
        display={display(pitch.id)}
        class="path-line"
        d={pathGen(pitch.id)}
        stroke={colorScale(interactions.color_store, pitch)}
        opacity={opacity(pitch.id)}
        stroke-width={stroke(pitch.id)}
        on:mouseover={() => mouseOver(pitch.id)}
        on:mouseout={() => mouseOut()}
      />

      <circle r="8" stroke="white" fill="white" display={display(pitch.id)}>
        <animateMotion dur="{pitchTime(pitch.id)}s" repeatCount="1"
        begin="sidepitch{pitch.id}.click; overpitch{pitch.id}.click; 
        strikepitch{pitch.id}.click; pitch.click; 
        speedpitch{pitch.id}.click; breakpitch{pitch.id}.click" 
        path={pathGen(pitch.id)} />
      </circle>
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
    stroke-linejoin: round;
    stroke-linecap: round;
  }
</style>
