<script>
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import "./chartpoint";

  export let filtered = [];
  export let interactions;
  // position="{xScale(pitch.pfx_x * 12) - width} {yScale(pitch.release_pos_z * 39.3701 - pitch.plate_z * 39.3701) - height} 0.001"
  export let pitches = [];

  let width = 2;
  let height = 1;

  const yTicks = [-2, -1, 0, 1, 2];
  const xTicks = [-2, -1, 0, 1, 2];

  const padding = { top: 0.08, right: 0.08, bottom: 0.08, left: 0.08};

  $: xScale = scaleLinear()
    .domain([-2, 2])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([2, -2])
    .range([height - padding.bottom, padding.top]);

  $: radius = function(id) {
    if (interactions.hover_store == id || $peerInteraction.hover_store == id){
      return "0.03"
    } 
    return "0.015"
  }

  $: opacity = function(id) {
    if (interactions.hover_store == id){
      return "1"
    } 
    else if (interactions.hover_store == null){
      return "0.8"
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
  <a-entity position="0 {0 - (height / 2) + padding.top} 0.001">
    <a-plane 
        color="white" 
        height="0.005" 
        width={width - (padding.right + padding.left)}
        position="0 0 0"
        opacity="1">
    </a-plane>

    {#each yTicks as tick}
      <a-plane 
        color="white" 
        height="0.005" 
        width={width - (padding.right + padding.left)}
        position="0 {yScale(tick) - padding.bottom} 0"
        opacity="0.1">
      </a-plane>

      <a-text align="right" anchor="right" value="{tick}ft" position="{0  - (width / 2) + padding.left} {yScale(tick) - padding.bottom} 0" scale="0.2 0.2 0.2"></a-text>
    {/each}
  </a-entity>

  <!-- x axis -->
  <a-entity position="{0 - (width / 2) + padding.left} 0 0.001">
    <a-plane 
        color="white" 
        height={height - (padding.top + padding.bottom)}
        width="0.005"
        position="0 0 0"
        opacity="1">
    </a-plane>
   
    {#each xTicks as tick}
      <a-plane 
        color="white" 
        height={height - (padding.top + padding.bottom)}
        width="0.005" 
        position="{xScale(tick) - padding.right} 0 0"
        opacity="0.1">
      </a-plane>

      <a-text align="center" anchor="center" value="{tick}ft" position="{xScale(tick)- padding.right} {(0 - height/2) + padding.bottom / 2} 0" scale="0.2 0.2 0.2"></a-text>
    {/each}
  </a-entity>

  <a-entity>
    {#each pitches as pitch, i}
    <!--
      <a-circle class="collidable"
        color='{colorScale(interactions.color_store, pitch)}' 
        opacity='{opacity(pitch.id)}'
        radius='{radius(pitch.id)}'
        position="{xScale(pitch.pfx_x * 12)  - (width / 2)} {(yScale(pitch.release_pos_z * 39.3701 - pitch.plate_z * 39.3701) - (height / 2))} 0.001{i + 1}"
        on:mouseenter={() => mouseOver(pitch.id)}
        on:mouseleave={() => mouseOut()}>
      </a-circle>
    -->
    <a-entity 
    class={classed(pitch.id)}
    visible={visible(pitch.id)}
      chartpoint="color: {colorScale(interactions.color_store, pitch)};
                  opacity: {opacity(pitch.id)};
                  radius: {radius(pitch.id)};"
      position="{xScale(pitch.pfx_x)  - (width / 2)} {(yScale(pitch.pfx_z) - (height / 2))} 0.001{i + 1}"
      on:mouseenter={() => mouseOver(pitch.id)}
      on:mouseleave={() => mouseOut()}>
    </a-entity>

    {/each}
  </a-entity>

</a-plane>
<style>


</style>