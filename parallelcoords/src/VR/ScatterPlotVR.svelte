<script>
  import {ticks, range, extent, min} from "d3";
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScale } from "../colorScales";
  import "aframe-meshline-component";
  import "./chartpoint";

  export let dimension;
  export let nextDimension;
  export let pos = 'none';
  export let pos2 = 'none';
  export let interactions = 'none';
  export let height = 1;
  export let width = 1;

  $: minMax = extent(dimension.data);

  $: xTicks = range(dimension.data.length);
  $: yTicks = ticks(minMax[0],minMax[1]);

  const padding = { top: 0.08, right: 0.08, bottom: 0.08, left: 0.08};

  $: xScale = scaleLinear()
    .domain([0, dimension.data.length - 1])
    .range([-(width/2), (width/2)]);

  //$: yScale = scaleLinear()
  //  .domain(minMax)
  //  .range([-(height/2), (height/2)]);

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

  function changeOrderUp(name){
    let store = interactions.filter_store;
    let index = store.indexOf(name);
    if (index != interactions.filter_store.length + 1){
      store.splice(index, 1);
      store.splice(index + 1, 0, name);
      interaction_store.setFilterStore(store);
    }
  }

  function changeOrderDown(name){
    let store = interactions.filter_store;
    let index = store.indexOf(name);
    if (index != 0){
      store.splice(index, 1);
      store.splice(index - 1, 0, name);
      interaction_store.setFilterStore(store);
    }
  }
</script>

<a-plane class="collidable" color="#333333" rotation="0 90 0" position="{pos} 0 0" height={height} width={width} material="opacity: 0.2; transparent: true; side: double">

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

  {#each dimension.data as d, i}
    <a-entity 
      chartpoint="id: {i};
                  color: {'red'};
                  opacity: {1};
                  radius: {0.015};"
      position="{xScale(i)} {dimension.yScale(d)} 0.001">
    </a-entity>
    {/each}
</a-plane>

<a-entity position="{pos} {-height/1.5} {width/2}">
  <a-entity text="value: {dimension.name}; color: black; align: center;" scale="1.5 1.5 1.5"></a-entity>
  <a-triangle class="collidable" color="#000000"  scale="0.1 0.1 0.1" rotation="0 0 90" position="-0.1 -0.1 0" on:click="{() => changeOrderDown(dimension.name)}"></a-triangle>
  <a-triangle class="collidable" color="#000000"  scale="0.1 0.1 0.1" rotation="0 0 -90" position="0.1 -0.1 0" on:click="{() => changeOrderUp(dimension.name)}"></a-triangle>
</a-entity>

{#if nextDimension != 'none'}
{#each dimension.data as d, i}
    <a-entity meshline="lineWidth: 2; path:{xScale(i)} {dimension.yScale(d)} {pos},{xScale(i)} {nextDimension.yScale(nextDimension.data[i])} {pos2}; color: #E20049" rotation="0 90 0"></a-entity>
{/each}
{/if}
