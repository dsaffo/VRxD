<script>
  import {flip} from 'svelte/animate';
  import {Row, Col} from 'sveltestrap';
  import { interaction_store } from '../stores.js'

  export let interactions;

  let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move'; 
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = interactions.filter_store;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    
    interaction_store.setFilterStore(newTracklist);

    hovering = null
  }

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  }

</script>

<div class="list">
  {#each interactions.filter_store as n, index  (n)}
    <div
			 class="list-item" 
       animate:flip="{{duration: 200}}"
       draggable={true} 
       on:dragstart={event => dragstart(event, index)}
       on:drop|preventDefault={event => drop(event, index)}
       ondragover="return false"
       on:dragenter={() => hovering = index}
       class:is-active={hovering === index}>
       <span>{n}</span>
    </div>
  {/each}
</div>
<div class="buttons">
  <button on:click="{() => interaction_store.updateLocalColor("absolute")}">Colorize Absolute</button>
  <button on:click="{() => interaction_store.updateLocalColor("relative")}">Colorize Relative</button>
</div>

<style>
  .list {
    width: 94%;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .buttons {
    width: 4%;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .list-item {
    text-align: center;
    width: min-content;
    color: white;
    padding: 0.5em 1em;
    border: 1px solid #dbdbdb;
    background-color: #2c2928;
  }


  .list-item.is-active {
    background-color: #3273dc;
    color: #fff;
  }
</style>