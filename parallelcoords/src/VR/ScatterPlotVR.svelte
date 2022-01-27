<script>
  import {ticks, range, extent, min} from "d3";
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import "./chartpoint";

  export let dimension;
  export let interactions;
  export let height = 1;
  export let width = 1;

  $: minMax = extent(dimension.data);

  $: xTicks = range(dimension.data.length);
  $: yTicks = ticks(minMax[0],minMax[1]);

  const padding = { top: 0.08, right: 0.08, bottom: 0.08, left: 0.08};

  $: xScale = scaleLinear()
    .domain([0, dimension.data.length - 1])
    .range([-(width/2), (width/2)]);

  $: yScale = scaleLinear()
    .domain(minMax)
    .range([-(height/2), (height/2)]);

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

<a-plane class="collidable" color="#333333" height={height} width={width} material="opacity: 0.2; transparent: true; side: double">

  <!-- y axis
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
  </a-entity> -->

  <!-- x axis 
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
  </a-entity> -->

  <a-entity>
    {#each dimension.data as d, i}
    <a-entity 
      chartpoint="id: {i};
                  color: {'red'};
                  opacity: {1};
                  radius: {0.015};"
      position="{xScale(i)} {yScale(d)} 0.001">
    </a-entity>

    {/each}
  </a-entity>

</a-plane>
<style>


</style>