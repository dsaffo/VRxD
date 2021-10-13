<script>
  import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import "./chartpoint";


  export let interactions;
  export let filtered;
  export let pitches = [];
  let data = pitches;

  let width = 2;
  let height = 1;

  const yTicks = [...new Set(data.map((item) => item.pitch_name))];
  const xTicks = [60, 70, 80, 90, 100];

  const padding = { top: 0.1, right: 0.08, bottom: 0.1, left: 0.5};

  $: xScale = scaleLinear()
    .domain([60, 100])
    .range([padding.left, width - padding.right]);

  $: xScale2 = scaleLinear().domain([0, 100]).range([0, padding.left]);

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

    $: radius = function(id) {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
          return "0.03"
        } 
        return "0.015"
      }

    $: opacity = function(id) {
        if (interactions.hover_store == id || $peerInteraction.hover_store == id){
        return "1"
        } 
        else if (interactions.hover_store == null){
        return "0.5"
        }
        return "0.1"
        }

    $: visible = function(id) {
        if (filtered.includes(id)){
            return "true"
        } 
        return "false"
    }

    $: classed = function(id) {
        if (filtered.includes(id)){
            return "collidable"
        } 
        return "none"
    }

    function mouseOver(index){
      interaction_store.updateLocalHover(index);
    }

    function mouseOut(){
      interaction_store.updateLocalHover(null);
    }

</script>

<a-plane class="collidable" color="#333333" height={height} width={width}>

  <!-- y axis -->
  <a-entity position="0 {0 - (height / 2) + padding.top - 0.02} 0.001">

    {#each yTicks as tick}
      <a-plane 
        color="white" 
        height="0.005" 
        width={width - (padding.right + padding.left)}
        position="{(padding.left - padding.right) / 2} {yScale(tick) + (padding.bottom /2)} 0"
        opacity="0.1">
      </a-plane>

      <a-text align="right" anchor="right" value="{tick}" position="{0  - (width / 2) + padding.left} {yScale(tick) + (padding.bottom /2) + 0.08} 0" scale="0.2 0.2 0.2"></a-text>
    {/each}
  </a-entity>

  <!-- x axis -->
  <a-entity position="{0 - (width / 2) + padding.left} -0.02 0.001">
    <a-plane 
        color="white" 
        height={height - (padding.top)}
        width="0.005"
        position="0 {padding.top} 0"
        opacity="1">
    </a-plane>
   
    {#each xTicks as tick}
      <a-plane 
        color="white" 
        height={height - (padding.top)}
        width="0.005" 
        position="{xScale(tick) - (padding.left)} {padding.top - 0.02} 0"
        opacity="0.1">
      </a-plane>

      <a-text align="center" anchor="center" value="{tick}" position="{xScale(tick)- padding.left} {(0 - height/2) + padding.bottom} 0" scale="0.2 0.2 0.2"></a-text>
    {/each}
  </a-entity>

  <a-entity position="0 -0.02 0">
    {#each pitches as pitch, i}
      <a-entity 
      class={classed(pitch.id)}
      visible={visible(pitch.id)}
      chartpoint="color: {colorScale(interactions.color_store, pitch)};
                  opacity: {opacity(pitch.id)};
                  radius: {radius(pitch.id)};"
      position="{xScale(pitch.effective_speed)  - (width / 2)} {(yScale(pitch.pitch_name) + (padding.bottom + padding.top /2) - (height / 2))} 0.002{i + 2}"
      on:mouseenter={() => mouseOver(pitch.id)}
      on:mouseleave={() => mouseOut()}>
    </a-entity>
    {/each}
  </a-entity>


  <a-entity position="0 -0.02 0">
    {#each pitchData as pitch}
      <a-plane
        height="0.08"
        width="0.01"
        opacity="0.5"
        color="grey"
        position="{xScale(pitch.speed)  - (width / 2)} {(yScale(pitch.pitch) + (padding.bottom + padding.top /2) - (height / 2))} 0.003"
        >
      </a-plane>
      {/each}
  </a-entity>

  <a-entity position="0 -0.02 0">
    {#each pitchData as pitch}
      <a-plane
        height="0.1"
        width={xScale2(pitch.percent)}
        color="{barColors(yTicks.indexOf(pitch.pitch))}"
        position="{0 - (width / 2) + padding.left - (xScale2(pitch.percent) / 2)} {(yScale(pitch.pitch) + (padding.bottom + padding.top / 2) - (height / 2))} 0.003"
        >
      </a-plane>
      {/each}
  </a-entity>

</a-plane>
<style>


</style>