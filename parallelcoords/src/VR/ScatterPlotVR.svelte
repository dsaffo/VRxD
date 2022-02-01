<script>
  import {ticks, range, extent, min} from "d3";
  import { scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import { colorScaleVR } from "../colorScales";
  import "aframe-meshline-component";
  import "./chartpoint";

  export let dimension;
  export let nextDimension;
  export let firstDimension;
  export let pos = 'none';
  export let pos2 = 'none';
  export let interactions = 'none';
  export let height = 1.2;
  export let width = 1;

  $: minMax = extent(dimension.data);

  $: xTicks = range(dimension.data.length);
  $: yTicks = ticks(minMax[0],minMax[1]);

  const padding = { top: 0.08, right: 0.08, bottom: 0.08, left: 0.08};

  $: xScale = scaleLinear()
    .domain([-1, dimension.data.length])
    .range([-(width/2) + padding.left, (width/2) - padding.right]);

  let radius = function(id) {
    if (interactions.hover_store == id || $peerInteraction.hover_store == id){
      return "0.04"
    } 
    return "0.02"
  }

  let opacity = function(id) {
    if (interactions.hover_store == id){
      return "1"
    } 
    else if (interactions.hover_store == null){
      return "0.8"
    }

    return "0.1"
  }

  let stroke = function(id) {
    if (interactions.hover_store == id || $peerInteraction.hover_store == id){
      return "10"
    }  else if (interactions.hover_store == null){
      return "3"
    }
    return "1"
  }

  function mouseOver(index){
    interaction_store.updateLocalHover(index);
  }

  function mouseOut(){
    interaction_store.updateLocalHover(null);
  }

  function changeOrderUp(name){
    let store = interactions.filter_store.slice(0);
    let index = store.indexOf(name);
    if (index != interactions.filter_store.length + 1){
      store.splice(index, 1);
      store.splice(index + 1, 0, name);
      interaction_store.setFilterStore(store);
    }
  }

  function changeOrderDown(name){
    let store = interactions.filter_store.slice(0);
    let index = store.indexOf(name);
    if (index != 0){
      store.splice(index, 1);
      store.splice(index - 1, 0, name);
      interaction_store.setFilterStore(store);
    }
  }
</script>

<a-plane color="white" rotation="0 90 0" position="{pos} 0 0" height={height} width={width} material="opacity: 0.2; transparent: true; side: double; depthTest:false">

  <!-- y axis-->
  <a-entity position="0 0 0.001">
    
    {#each dimension.yTicks as tick}
      <a-plane 
        color="white" 
        height="0.005" 
        width={width - (padding.right + padding.left)}
        position="0 {dimension.yScale(tick)} 0"
        opacity="0.5" 
        material="side: double;">
      </a-plane>
      <a-text color="white" align="right" anchor="right" value="{tick}" position="{-(width / 2) + padding.left} {dimension.yScale(tick)} 0" scale="0.2 0.2 0.2"></a-text>
      <a-text color="white" align="left" anchor="left" value="{tick}" position="{-(width / 2) + padding.left} {dimension.yScale(tick)} 0" rotation="0 180 0" scale="0.2 0.2 0.2"></a-text>
    {/each}
  </a-entity> 

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
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <a-entity 
      class="collidable"
      chartpoint="id: {i};
                  color: {'white'};
                  opacity: {opacity(dimension.ids[i])};
                  radius: {radius(dimension.ids[i])};"
      position="{xScale(i)} {dimension.yScale(d)} 0.001"
      on:mouseenter={() => mouseOver(dimension.ids[i])}
      on:mouseleave={() => mouseOut()}>
    </a-entity>
    {/each}
</a-plane>

<a-entity position="{pos} {-height/1.5} 0">
  <a-entity text="value: {dimension.name}; color: white; align: center;" scale="1.5 1.5 1.5"></a-entity>
  <a-entity text="value: {dimension.name}; color: white; align: center;" scale="1.5 1.5 1.5" rotation="0 180 0"></a-entity>
  <a-triangle class="collidable" color="white" material="side: double;" scale="0.1 0.1 0.1" rotation="0 0 90" position="-0.1 -0.1 0" on:click="{() => changeOrderDown(dimension.name)}"></a-triangle>
  <a-triangle class="collidable" color="white" material="side: double;"  scale="0.1 0.1 0.1" rotation="0 0 -90" position="0.1 -0.1 0" on:click="{() => changeOrderUp(dimension.name)}"></a-triangle>
</a-entity>

{#if nextDimension != 'none'}
{#each dimension.data as d, i}
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <a-entity class="collidable" meshline="lineWidth: {stroke(dimension.ids[i])}; path:{xScale(i)} {dimension.yScale(d)} {pos},{xScale(i)} {nextDimension.yScale(nextDimension.data[i])} {pos2}; color:{colorScaleVR(interactions.color_store, firstDimension.data, dimension.data, nextDimension.data, i)}" 
    rotation="0 90 0"
    on:mouseenter={() => mouseOver(dimension.ids[i])}
    on:mouseleave={() => mouseOut()}
    ></a-entity>
{/each}
{/if}
