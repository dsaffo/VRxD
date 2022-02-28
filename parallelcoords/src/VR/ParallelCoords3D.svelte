<script>
  import "aframe";
  import "super-hands";
  import { range , extent } from "d3";
  import { scaleBand, scaleLinear } from "d3-scale";
  import { interaction_store, peerInteraction} from "../stores";
  import ScatterPlotVR from "./ScatterPlotVR.svelte";

  export let data;
  export let interactions;

  let width = 6;
  let height = 1.2;
  const padding = { top: 0.08, right: 0.08, bottom: 0.08, left: 0.08 };

  let dimensions = data["columns"].slice(3);
  let coords = [];
  $: lengthD = interactions.filter_store.length;

  $: xScale = scaleLinear()
      .domain([0, lengthD - 1])
      .range([-width/2, width/2]);

  const xTicks = range(lengthD);

  for (let i = 0; i < dimensions.length; i++){
    let coord = {}
    let dimension = dimensions[i];
    let minMax = extent(data, d => d[dimension]);
    let cData = [];
    let ids = [];

    data.forEach(function(obj){
      cData.push(obj[dimension]);
      ids.push([obj['player_id'],obj[dimension]]);
      coord['yScale'] = scaleLinear()
      .domain([minMax[0],minMax[1]]).nice()
      .range([-(height/2) + padding.bottom, (height/2) - padding.top]);
      coord['yTicks'] = scaleLinear().domain([minMax[0],minMax[1]]).nice().ticks(10);
      coord['name'] = dimension;
      coord['data'] = cData.slice().sort((a,b) => a - b);
      ids = ids.sort((a, b) => coord['data'].indexOf(a[1]) - coord['data'].indexOf(b[1]));
      let flatids = [];
      ids.forEach(function(i){
        flatids.push(i[0]);
      });
      coord['ids'] = flatids;
      coord['xScale'] = scaleBand()
      .domain(coord['ids'])
      .range([-(1/2) + padding.left, (1/2) - padding.right]);
    });

    coords[i] = coord;
  }

  let filtered_coords = [];
  //let oldFilterStore = [];


  $: {
    filtered_coords = [];
    for (let i = 0; i < lengthD; i++){
      filtered_coords.push(coords[dimensions.indexOf(interactions.filter_store[i])]);
    }
  };


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


{#each filtered_coords as coords, i}
  <!--<a-plane color="#000000" height="1" width="1" rotation="0 90 0"  position="{xScale(i)} 0 0" material="opacity: 0.2; transparent: true; side: double"></a-plane>-->
  {#if i < lengthD - 1}
  <ScatterPlotVR interactions={interactions} dimension={coords} firstDimension={filtered_coords[0]} nextDimension={filtered_coords[interactions.filter_store.indexOf(coords.name) + 1]} pos={xScale(i)} pos2={xScale(i+1)}></ScatterPlotVR>
  <a-entity position="{xScale(i)} {-height/1.5} 0">
    <a-entity text="value: {coords.name}; color: white; align: center;" scale="1.5 1.5 1.5"></a-entity>
    <a-entity text="value: {coords.name}; color: white; align: center;" scale="1.5 1.5 1.5" rotation="0 180 0"></a-entity>
    <a-triangle  class="collidable" color="white" material="side: double;" scale="0.2 0.2 0.2" rotation="0 0 90" position="-0.2 -0.13 0" on:click={() => changeOrderDown(coords.name)} ></a-triangle>
    <a-triangle  class="collidable" color="white" material="side: double;"  scale="0.2 0.2 0.2" rotation="0 0 -90" position="0.2 -0.13 0"  on:click={() => changeOrderUp(coords.name)}></a-triangle>
  </a-entity>
  {:else}
  <ScatterPlotVR interactions={interactions} dimension={coords} firstDimension={filtered_coords[0]} nextDimension={"none"} pos={xScale(i)}></ScatterPlotVR>
  <a-entity position="{xScale(i)} {-height/1.5} 0">
    <a-entity text="value: {coords.name}; color: white; align: center;" scale="1.5 1.5 1.5"></a-entity>
    <a-entity text="value: {coords.name}; color: white; align: center;" scale="1.5 1.5 1.5" rotation="0 180 0"></a-entity>
    <a-triangle  class="collidable" color="white" material="side: double;" scale="0.2 0.2 0.2" rotation="0 0 90" position="-0.2 -0.13 0" on:click={() => changeOrderDown(coords.name)}></a-triangle>
    <a-triangle  class="collidable" color="white" material="side: double;"  scale="0.2 0.2 0.2" rotation="0 0 -90" position="0.2 -0.13 0" on:click={() => changeOrderUp(coords.name)}></a-triangle>
  </a-entity>
  {/if}
{/each}

